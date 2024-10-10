import express from "express";
import * as authController from "../controllers/authController";
import { verifyUser } from "../utils/verifyUser";

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/signin").post(authController.signin);
router.route("/signout").get(authController.logout);
router.route("/google").post(authController.google);
router.get("/isLoggedIn", verifyUser, authController.isLoggedIn);

export default router;
