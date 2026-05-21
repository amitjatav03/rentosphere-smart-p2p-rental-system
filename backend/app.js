const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Razorpay = require("razorpay")




// ============================================
// CONFIG
// ============================================

dotenv.config();

const app = express();


// ============================================
// DATABASE CONNECTION
// ============================================

const dbConnect = require("./config/database");

dbConnect();




// ============================================
// MIDDLEWARES
// ============================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());

app.use(cookieParser());


// ============================================
// ROUTES
// ============================================

// importing routes
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const rentalRoutes = require("./routes/rental.routes");
const messageRoutes = require("./routes/message.routes");


app.use("/api/auth", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/messages", messageRoutes);


// ============================================
// HEALTH CHECK ROUTE
// ============================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Smart P2P Rental System API is running"
  });
});


// ============================================
// 404 ROUTE HANDLER
// ============================================

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found"
  });
});


// ============================================
// SERVER
// ============================================

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});