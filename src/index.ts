import express from "express";
import { hotwireRouter } from "./routes/hotwire";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.get("/", (req, res) => res.send("hi"));

app.use("/hotwire", hotwireRouter);

app.listen(3000, () => console.log("listening on 3000"));
