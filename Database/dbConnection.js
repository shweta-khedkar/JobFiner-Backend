import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: "JOB_FINDER_MERN",
    })
    .then(() => {
      console.log(`Connected to MongoDB Database Successfully`);
    })
    .catch((err) => {
      console.log(`Some error found ${err}`);
    });
};
