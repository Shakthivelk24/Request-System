import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["pending", "accepted", "rejected", "cancelled"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

const Request = mongoose.model("Request", requestSchema);
export default Request;
