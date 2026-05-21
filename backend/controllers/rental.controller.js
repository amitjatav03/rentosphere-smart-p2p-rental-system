const Rental = require("../models/rental.model");
const Product = require("../models/product.model");

const Razorpay = require("razorpay");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY
});

// ================= CREATE RENTAL =================

module.exports.createRental = async (req, res) => {

    try {

        const {
            productId,
            startDate,
            endDate,
            deliveryMethod
        } = req.body;

        const renterId = req.user._id;

        const product = await Product.findById(productId);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const existingRental = await Rental.findOne({
            productId,
            status: {
                $in: ["accepted", "active"]
            }
        });

        if (existingRental) {

            return res.status(400).json({
                success: false,
                message: "Product currently unavailable"
            });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        const diffTime = end - start;

        const totalDays = Math.ceil(
            diffTime / (1000 * 60 * 60 * 24)
        );

        if (totalDays <= 0) {

            return res.status(400).json({
                success: false,
                message: "Invalid rental duration"
            });
        }

        const totalCost =
            totalDays * product.pricePerDay;

        const rental = await Rental.create({

            productId,
            renterId,
            ownerId: product.owner,

            startDate,
            endDate,

            totalCost,

            deliveryMethod,

            status: "requested",
            paymentStatus: "pending"
        });

        return res.status(201).json({
            success: true,
            rental,
            message: "Rental request created"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// ================= GET RENTER RENTALS =================

module.exports.getRenterRentals = async (req, res) => {

    try {

        const rentals = await Rental.find({
            renterId: req.user._id
        })

        .populate("productId")
        .populate("ownerId", "fullname email phone")

        .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            rentals
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// ================= GET LENDER RENTALS =================

module.exports.getLenderRentals = async (req, res) => {

    try {

        const rentals = await Rental.find({
            ownerId: req.user._id
        })

        .populate("productId")
        .populate("renterId", "fullname email phone")

        .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            rentals
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// ================= GET SINGLE RENTAL =================

module.exports.getSingleRental = async (req, res) => {

    try {

        const rental = await Rental.findById(req.params.id)

        .populate("renterId", "fullname email phone")
        .populate("ownerId", "fullname email phone")
        .populate("productId");

        if (!rental) {

            return res.status(404).json({
                success: false,
                message: "Rental not found"
            });
        }

        return res.status(200).json({
            success: true,
            rental
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// ================= ACCEPT RENTAL =================

module.exports.acceptRental = async (req, res) => {

    try {

        const rental = await Rental.findById(req.params.id);

        if (!rental) {

            return res.status(404).json({
                success: false,
                message: "Rental not found"
            });
        }

        rental.status = "accepted";

        await rental.save();

        return res.status(200).json({
            success: true,
            message: "Rental accepted"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// ================= REJECT RENTAL =================

module.exports.rejectRental = async (req, res) => {

    try {

        const rental = await Rental.findById(req.params.id);

        if (!rental) {

            return res.status(404).json({
                success: false,
                message: "Rental not found"
            });
        }

        rental.status = "rejected";

        await rental.save();

        return res.status(200).json({
            success: true,
            message: "Rental rejected"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// ================= PAY RENTAL =================

module.exports.payRental = async (req, res) => {

    try {

        const rental = await Rental.findById(req.params.id);

        if (!rental) {

            return res.status(404).json({
                success: false,
                message: "Rental not found"
            });
        }

        rental.paymentStatus = "paid";

        rental.status = "active";

        rental.paymentId =
            req.body.paymentId || "demo_payment";

        rental.paidAt = new Date();

        await rental.save();

        return res.status(200).json({
            success: true,
            message: "Payment successful"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// ================= COMPLETE RENTAL =================

module.exports.completeRental = async (req, res) => {

    try {

        const rental = await Rental.findById(req.params.id);

        if (!rental) {

            return res.status(404).json({
                success: false,
                message: "Rental not found"
            });
        }

        rental.status = "completed";

        await rental.save();

        return res.status(200).json({
            success: true,
            message: "Rental completed"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// ================= LENDER SUMMARY =================

module.exports.getLenderSummary = async (req, res) => {

    try {

        const rentals = await Rental.find({
            ownerId: req.user._id,
            paymentStatus: "paid"
        });

        const totalEarnings = rentals.reduce(
            (acc, curr) => acc + curr.totalCost,
            0
        );

        return res.status(200).json({

            totalEarnings,

            totalRentals: rentals.length,

            averageRating: 4.9
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};