import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../../services/mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await connectToDatabase(process.env.MONGODB_URI || "");

  switch (req.method) {
    default:
      res.setHeader("Allow", "POST, GET");
      return res.status(405).send("Method not allowed");

    case "GET": {
      const session = await getSession({ req });
      if (session?.user?.email) {
        try {
          const lastTimeOpen = await db
            .collection("lastTimeOpen")
            .find({ user_email: session?.user?.email })
            .toArray();
          return res.status(200).json(lastTimeOpen);
        } catch (error) {
          console.log("get lastTimeOpen error", error);
          return res.status(500).send(error);
        }
      } else {
        return res.status(200).json([]);
      }
    }

    case "POST": {
      try {
        let lastTimeOpen = await db
          .collection("lastTimeOpen")
          .insertOne(req.body);
        return res.status(200).json(lastTimeOpen);
      } catch (error) {
        console.log("create error:", error);
        return res.status(500).send(error);
      }
    }
  }
};
