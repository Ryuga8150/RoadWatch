import { Router } from "express";
import * as complaintController from "./../controllers/complaintController";

const router = Router();

// Route to register a new complaint
router.route("/").post(complaintController.createComplaint);

export default router;
