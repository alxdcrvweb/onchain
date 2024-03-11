import type { NextApiRequest, NextApiResponse } from "next";
import { getPointsByAddressAndWriteToDb } from "../../lib/db";

type ResponseData = {
  points: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log(req.query.address);
  let points = await getPointsByAddressAndWriteToDb(req.query.address!.toString());
  res.status(200).json({ points: points });
}
