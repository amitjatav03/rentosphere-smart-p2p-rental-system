const Product = require("../models/product.model");
const User = require("../models/user.model");


// ============================================
// CREATE PRODUCT
// ============================================

exports.createProduct = async (req, res) => {
  try {

    const owner = req.user._id;

    const {
      productTitle,
      description,
      pricePerDay,
      category,
      location,
      productImages,
      deliveryAvailable
    } = req.body;

    // Validation
    if (
      !productTitle ||
      !description ||
      !pricePerDay ||
      !category ||
      !location ||
      !productImages
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Ensure images array
    const imageArray =
      Array.isArray(productImages)
        ? productImages
        : [productImages];

    // Create product
    const product =
      await Product.create({
        owner,
        productTitle,
        description,
        pricePerDay: Number(pricePerDay),
        category,
        location,
        productImages: imageArray,
        deliveryAvailable
      });

    // Push product into user
    await User.findByIdAndUpdate(
      owner,
      {
        $push: {
          products: product._id
        }
      }
    );

    return res.status(201).json({
      success: true,
      message:
        "Product listed successfully",
      product
    });

  } catch (error) {

    console.error(
      "Create Product Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


// ============================================
// GET ALL PRODUCTS
// ============================================

exports.getProducts = async (req, res) => {
  try {

    const products =
      await Product.find()
        .populate(
          "owner",
          "fullname phone"
        )
        .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {

    console.error(
      "Get Products Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


// ============================================
// GET OWNER PRODUCTS
// ============================================

exports.getOwnerProducts = async (req, res) => {
  try {

    const ownerId = req.user._id;

    const products =
      await Product.find({
        owner: ownerId
      })
        .populate(
          "owner",
          "fullname phone"
        )
        .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {

    console.error(
      "Owner Products Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


// ============================================
// GET SINGLE PRODUCT
// ============================================

exports.getSingleProduct = async (req, res) => {
  try {

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required"
      });
    }

    const product =
      await Product.findById(id)
        .populate(
          "owner",
          "fullname username email phone"
        );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      product
    });

  } catch (error) {

    console.error(
      "Get Product Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


// ============================================
// UPDATE PRODUCT
// ============================================

exports.updateProduct = async (req, res) => {
  try {

    const { id } = req.params;

    const ownerId = req.user._id;

    const product =
      await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Ownership check
    if (!product.owner.equals(ownerId)) {
      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    // Update fields
    Object.keys(req.body).forEach(
      (key) => {
        product[key] = req.body[key];
      }
    );

    await product.save();

    return res.status(200).json({
      success: true,
      message:
        "Product updated successfully",
      product
    });

  } catch (error) {

    console.error(
      "Update Product Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


// ============================================
// DELETE PRODUCT
// ============================================

exports.deleteProduct = async (req, res) => {
  try {

    const { id } = req.params;

    const ownerId = req.user._id;

    const product =
      await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Ownership check
    if (!product.owner.equals(ownerId)) {
      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    // Remove product from user
    await User.findByIdAndUpdate(
      ownerId,
      {
        $pull: {
          products: product._id
        }
      }
    );

    // Delete product
    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message:
        "Product deleted successfully"
    });

  } catch (error) {

    console.error(
      "Delete Product Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};