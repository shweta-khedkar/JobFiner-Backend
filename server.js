import { dbConnect } from "./Database/dbConnection.js";
import app from "./app.js";
import dotenv from "dotenv";

//configure
dotenv.config();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

//database
dbConnect();
