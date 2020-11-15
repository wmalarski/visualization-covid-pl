import set from "lodash/set";
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const client = new MongoClient(process.env.MONGO_DB_CONNECTION ?? "", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req: NextApiRequest, res: NextApiResponse, next: any) {
  if (!process.env.MONGO_DB_NAME) return next();
  if (!client.isConnected()) await client.connect();

  set(req, "dbClient", client);
  set(req, "db", client.db(process.env.MONGO_DB_NAME));

  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
