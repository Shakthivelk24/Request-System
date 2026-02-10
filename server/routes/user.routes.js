import express from "express";
import { signIn, signOut, signUp } from "../controllers/user.controller.js";

const router = express.Router();

// Register user
router.post("/register", signUp);

// Login user
router.post("/login",signIn);

// Logout user
router.get("/logout", signOut);

export default router;
