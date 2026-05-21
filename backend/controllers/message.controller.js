const Message = require("../models/message.model");
const Rental = require("../models/rental.model");


// ============================================
// SEND MESSAGE
// ============================================

module.exports.sendMessage = async (req, res) => {
  try {

    const {
      rentalId,
      receiverId,
      text
    } = req.body;

    const senderId = req.user._id;

    // Validation
    if (
      !rentalId ||
      !receiverId ||
      !text
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Check rental exists
    const rental =
      await Rental.findById(rentalId);

    if (!rental) {
      return res.status(404).json({
        success: false,
        message: "Rental not found"
      });
    }

    // Security:
    // Only renter & owner can chat
    const isParticipant =
      rental.renterId.equals(senderId) ||
      rental.ownerId.equals(senderId);

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message:
          "Not authorized to send messages"
      });
    }

    // Create message
    const message =
      await Message.create({
        rentalId,
        senderId,
        receiverId,
        text
      });

    // Populate sender
    const populatedMessage =
      await Message.findById(message._id)
        .populate(
          "senderId",
          "fullname"
        );

    return res.status(201).json({
      success: true,
      message: "Message sent",
      data: populatedMessage
    });

  } catch (error) {

    console.error(
      "Send Message Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


// ============================================
// GET MESSAGES
// ============================================

module.exports.getMessages = async (req, res) => {
  try {

    const { rentalId } = req.params;

    const userId = req.user._id;

    // Check rental exists
    const rental =
      await Rental.findById(rentalId);

    if (!rental) {
      return res.status(404).json({
        success: false,
        message: "Rental not found"
      });
    }

    // Security check
    const isParticipant =
      rental.renterId.equals(userId) ||
      rental.ownerId.equals(userId);

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message:
          "Not authorized to view messages"
      });
    }

    // Fetch messages
    const messages =
      await Message.find({ rentalId })
        .populate(
          "senderId",
          "fullname"
        )
        .populate(
          "receiverId",
          "fullname"
        )
        .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      count: messages.length,
      messages
    });

  } catch (error) {

    console.error(
      "Get Messages Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};