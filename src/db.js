import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(
  process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;

const checkOpen = () => console.log("✅ Connected to DB");
const checkError = error => console.log(`❌ Error on DB Connection:${error}`);

db.once("open", checkOpen);
db.on("error", checkError);
