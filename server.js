import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import requestRoutes from "./routes/request.routes.js";

const app = express();
app.use(express.json());
app.use(cors());

// Connect MongoDB
mongoose.connect("mongodb+srv://shakthivelk1124_db_user:zZoYOuvMHwCvuclP@cluster0.tw8iubv.mongodb.net/requestApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log("🚀 Server running on port " + PORT));
