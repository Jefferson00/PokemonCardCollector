import { MongoClient } from "mongodb";

let cachedDb: any = null;

export async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(uri);

  const db = client.db("pokemon-collector");

  cachedDb = db;

  return db;
}
