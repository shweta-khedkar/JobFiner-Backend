import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoute from "./Routes/UserRoute.js";
import { errorHandler } from "./Middlewares/ErrorMiddleware.js";

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

//Routes
app.use("/api/v1/users", UserRoute);
//app.use("/api/v1/jobs");

app.use(errorHandler);
export default app;
