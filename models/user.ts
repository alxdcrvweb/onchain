import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    fid: number;
    address: string;
    points: number;
    viewed: boolean;
}

const UserSchema = new mongoose.Schema<IUser>({
    fid: Number,
    address: {
        type: String,
        unique: true
    },
    points: Number,
    viewed: {
        type: Boolean,
        default: false
    }
});

const User = mongoose?.models?.user || mongoose.model<IUser>("user", UserSchema);
export default User;
