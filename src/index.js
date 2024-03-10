import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import PostRouter from "./routes/post.routes.js";
import UserRouter from "./routes/user.routes.js";
import DataBaseConnection from "./database/connectDB.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  // console.log("runn");
  res.status(200).send({
    message: "app is running",
  });
});

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/post", PostRouter);

DataBaseConnection().then(() => {
  app.listen(PORT, () => {
    console.log("Server in running on port :", PORT);
  });
});
