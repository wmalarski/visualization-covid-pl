import get from "lodash/get";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { SpreadsheetData } from "../../utils/common/types";

const handler = nextConnect();

handler.use(middleware);

handler.get(
  async (req: NextApiRequest, res: NextApiResponse<SpreadsheetData>) => {
    const doc = await get(req, "db").collection("reports").findOne();
    res.json(doc);
  },
);

export default handler;
