import "./db";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

import "./Models/Video";
import "./Models/Comments";
import "./Models/User";

const PORT = process.env.PORT || 4000;

const checkListening = () =>
  console.log(`✅Listening on: http://localhost:${PORT}`);

app.listen(PORT, checkListening);
