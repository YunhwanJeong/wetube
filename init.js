import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./Models/Video";
import "./Models/Comments";

const PORT = process.env.PORT || 4000;

const checkListening = () =>
  console.log(`✅Listening on: http://localhost:${PORT}`);

app.listen(PORT, checkListening);