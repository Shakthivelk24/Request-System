import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import requestRoutes from "./routes/request.routes.js";
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";


connectDB()
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());


// Routes
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);

// Start server
const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running in http://localhost:${port}`));
