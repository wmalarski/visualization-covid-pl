import get from "lodash/get";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { SpreadsheetInput } from "../../utils/common/input";

const handler = nextConnect();

handler.use(middleware);

handler.get(
  async (req: NextApiRequest, res: NextApiResponse<SpreadsheetInput>) => {
    const doc = await get(req, "db")
      .collection("reports")
      .findOne({}, { sort: { date: -1 } });

    res.json(SpreadsheetInput.encode(doc));
  },
);

export default handler;
