import express from "express";
import router from "./src/routes/user.routes.js";
import { connectMongo } from "./src/database/mongo.js";
import { port } from "./src/config/env.js";
import cors from "cors";
import hireMeRouter from "./src/routes/hireme.routes.js";

const app = express();
// app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(express.json());
connectMongo();

//calling routers
app.use("/user", router);
app.use("/hireme", hireMeRouter);
app.use("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log("Server is running on port 4000");
});
