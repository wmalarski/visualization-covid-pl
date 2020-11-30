import get from "lodash/get";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const doc = await get(req, "db")
    .collection("reports")
    .findOne({}, { sort: { date: -1 } });
  res.json(doc);
  // res.json({
  //   cases: [],
  //   date: "",
  //   _id: "sds",
  //   summary: [],
  //   pandemic: [],
  //   population: range(1, 20).map(e => ({ population: e, region: `${e ** 6}` })),
  //   regionCases: [],
  //   regionPandemic: [],
  //   regionTests: [],
  //   tests: [],
  // });
});

export default handler;
