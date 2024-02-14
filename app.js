import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//configure
dotenv.config();

const app = express();
//app use

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//Test Health API
//Health Api
app.get("/api/v1/health", (_, res) => {
  res.status(200).json({
    status: "active",
    service: "Job Finder Backend",
    time: new Date(),
  });
});

export default app;
