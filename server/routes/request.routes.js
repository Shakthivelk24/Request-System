import express from "express";
import Request from "../models/request.model.js";
import User from "../models/user.model.js";
import { authMiddleware } from "../middleware/auth.js";
import { getReceivedRequests, getSentRequests, sendRequest, updateRequestStatus } from "../controllers/request.controller.js";

const router = express.Router();

// Send a request
router.post("/send", authMiddleware, sendRequest);

// Get all requests received by logged-in user
router.get("/received", authMiddleware, getReceivedRequests);

// Get all requests sent by logged-in user
router.get("/sent", authMiddleware, getSentRequests);

// Update request status (accept/reject/cancel)
router.put("/status/:requestId", authMiddleware, updateRequestStatus);

export default router;
