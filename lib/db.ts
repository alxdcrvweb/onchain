import mongoose from "mongoose";
import User from "../models/user";
import { fetchInfo } from "./moralis";

declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
};

export const getPointsByAddressAndWriteToDb = async (address: string) => {
  await dbConnect();
  let check = await User.find({ address });
  if (check.length > 0 && check[0].viewed) {
    let total = 0;
    for(let a of check) {
      total+= a.points;
    }
    return check[0].points;
  };
  let info = await fetchInfo(address);
  let user = new User(info);
  await user.save();
  return user.points;
};