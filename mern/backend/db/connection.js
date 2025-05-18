import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGODB_URI || "mongodb://mongodb:27017";  // fallback if env not set

const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB");
    db = client.db("employees");  // your DB name
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);  // exit app if DB connection fails
  }
}

await connectDB();

export default db;
