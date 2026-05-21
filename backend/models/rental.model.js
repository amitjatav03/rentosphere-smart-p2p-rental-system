const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
    
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        index: true
    },

    renterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true
    },

    totalCost: {
        type: Number,
        required: true,
        min: 0
    },

    deliveryMethod: {
        type: String,
        enum: ["pickup", "delivery"],
        required: true,
        default: "pickup"
    },

    status: {
        type: String,
        enum: [
            "requested",
            "accepted",
            "rejected",
            "active",
            "completed",
            "cancelled"
        ],
        default: "requested"
    },

    paymentStatus: {
        type: String,
        enum: [
            "pending",
            "paid",
            "refunded",
            "failed"
        ],
        default: "pending"
    },

    paymentId: {
        type: String,
        default: ""
    },

    paidAt: {
        type: Date
    }

}, { timestamps: true });

module.exports = mongoose.model("Rental", rentalSchema);