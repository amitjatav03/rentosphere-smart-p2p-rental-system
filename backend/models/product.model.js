const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    productTitle: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10
    },

    pricePerDay: {
      type: Number,
      required: true,
      min: 1
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    productImages: [
      {
        type: String,
        required: true
      }
    ],

    location: {
      type: String,
      required: true,
      trim: true
    },

    deliveryAvailable: {
      type: Boolean,
      default: false
    },

    // 🔥 IMPORTANT FOR RENTAL FLOW
    isAvailable: {
      type: Boolean,
      default: true
    },

    unavailableUntil: {
      type: Date,
      default: null
    },

    rentalRules: {
      type: [String],

      default: [
        "Use responsibly and avoid damage.",
        "Return on the due date.",
        "Do not lend the item to others.",
        "Late returns may incur extra charges.",
        "Damages will be charged from the security deposit."
      ]
    },

    // ⭐ Average Rating
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    // ⭐ Reviews
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },

        rating: {
          type: Number,
          min: 1,
          max: 5
        },

        comment: {
          type: String,
          trim: true,
          maxlength: 500
        },

        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);