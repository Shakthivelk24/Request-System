import Request from "../models/request.model.js";
import User from "../models/user.model.js";

// Get Current User Controller
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is set in req by authentication middleware
    const user = await User.findById(userId).select("-password"); // Exclude password field
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Handle user not found
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const sendRequest = async (req, res) => {
  try {
    const { receiverEmail, message } = req.body;
    const senderId = req.userId;

    // Find receiver using email
    const receiver = await User.findOne({ email: receiverEmail });

    if (!receiver) {
      return res.status(404).json({
        success: false,
        error: "Receiver not found",
      });
    }

    // Optional: Prevent sending request to yourself
    if (receiver._id.toString() === senderId.toString()) {
      return res.status(400).json({
        success: false,
        error: "You cannot send a request to yourself",
      });
    }

    const newRequest = new Request({
      sender: senderId,
      receiver: receiver._id,
      message,
    });

    await newRequest.save();

    res.status(201).json({
      success: true,
      request: newRequest,
    });

  } catch (err) {
    console.error("Send request error:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const getReceivedRequests = async (req, res) => {
  try {
    const requests = await Request.find({ receiver: req.userId })
      .populate("sender", "username email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSentRequests = async (req, res) => {
  try {
    const requests = await Request.find({ sender: req.userId })
      .populate("receiver", "username email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatus = ["pending", "accepted", "rejected", "cancelled"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updated = await Request.findOneAndUpdate(
      {
        _id: req.params.requestId,
        $or: [{ receiver: req.userId }, { sender: req.userId }],
      },
      { status },
      { new: true },
    ).populate("sender receiver", "username email");

    if (!updated) {
      return res
        .status(404)
        .json({ error: "Request not found or unauthorized" });
    }

    res.json({ message: "Status updated successfully", request: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error("Update request status error:", err.message);
  }
};
