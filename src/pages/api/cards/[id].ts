import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../services/mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await connectToDatabase(process.env.MONGODB_URI || "");
  const { id } = req.query;
  switch (req.method) {
    default:
      res.setHeader("Allow", "PUT, DELETE");
      return res.status(405).send("Method not allowed");

    case "PUT": {
      const objectId = new ObjectId(String(id));

      try {
        await db
          .collection("cards")
          .updateOne({ _id: objectId }, { $set: req.body });
        return res.status(200).json({
          message: "Card atualizado com sucesso!",
        });
      } catch (error) {
        return res.status(500).send(error);
      }
    }

    case "DELETE": {
      const objectId = new ObjectId(String(id));

      try {
        await db.collection("cards").deleteOne({ _id: objectId });
        return res.status(200).json({
          message: "Card deletado com sucesso!",
        });
      } catch (error) {
        return res.status(500).send(error);
      }
    }
  }
};
