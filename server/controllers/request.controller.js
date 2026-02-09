import Request from "../models/request.model";
import User from "../models/user.model";

export const sendRequest = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.user.userId;

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ error: "Receiver not found" });
    }
    const newRequest = new Request({
      sender: senderId,
      receiver: receiverId,
      message,
    });

    await newRequest.save();

    res.json({ success: true, request: newRequest });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getReceivedRequests = async (req, res) => {
  try {
    const requests = await Request.find({ receiver: req.user.userId })
      .populate("sender", "username email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSentRequests = async (req, res) => {
  try {
    const requests = await Request.find({ sender: req.user.userId })
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
        $or: [
          { receiver: req.user.userId },
          { sender: req.user.userId }
        ]
      },
      { status },
      { new: true }
    ).populate("sender receiver", "username email");

    if (!updated) {
      return res.status(404).json({ error: "Request not found or unauthorized" });
    }

    res.json({ message: "Status updated successfully", request: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
