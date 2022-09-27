import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../../services/mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const db = await connectToDatabase(process.env.MONGODB_URI || "");
    try {
      let projectCreated = await db.collection("cards").insertOne(req.body);
      res.status(200).json(projectCreated);
    } catch (error) {
      console.log("create error:", error);
      res.status(500).send(error);
    }
  } else if (req.method === "GET") {
    const session = await getSession({ req });
    if (session?.user?.email) {
      const db = await connectToDatabase(process.env.MONGODB_URI || "");
      console.log("user", session?.user?.email);
      try {
        const cards = await db
          .collection("cards")
          .find({ user_email: session?.user?.email })
          .toArray();
        res.status(200).json(cards);
      } catch (error) {
        console.log("get all error", error);
        res.status(500).send(error);
      }
    } else {
      res.status(200).json([]);
    }
  } else {
    res.setHeader("Allow", "POST, GET");
    res.status(405).send("Method not allowed");
  }
};
