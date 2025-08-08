import { Router } from "express";
import { userController } from "../controller/user.controller.js";

const router = Router();
router.post("/", userController);

export default router;
