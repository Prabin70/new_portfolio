import { Router } from "express";
import {
  createHireMe,
  deleteHireMe,
  getHireInformation,
  getHireInformationById,
  updateHireMe,
} from "../controller/hireme.controller.js";

const hireMeRouter = Router();
hireMeRouter.post("/create", createHireMe);
hireMeRouter.get("/get", getHireInformation);
hireMeRouter.get("/get/:id", getHireInformationById);
hireMeRouter.patch("/update/:id", updateHireMe);
hireMeRouter.delete("/delete/:id", deleteHireMe);

export default hireMeRouter;
