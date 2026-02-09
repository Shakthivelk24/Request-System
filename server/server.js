import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import requestRoutes from "./routes/request.routes.js";
import "dotenv/config.js";
import cookieParser from "cookie-parser";



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());


// Routes
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log("🚀 Server running on port " + PORT));
