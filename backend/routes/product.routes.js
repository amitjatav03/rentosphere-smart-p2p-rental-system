const express = require('express');
const router = express.Router();
const product = require('../controllers/product.controller');
const auth = require('../middleware/auth');

router.post('/create-product', auth, product.createProduct);
router.get('/get-products', product.getProducts);
router.get('/get-owner-products/', auth, product.getOwnerProducts);
router.get('/get-product/:id', product.getSingleProduct);
router.patch('/update-product', auth, product.updateProduct);
router.delete('/delete-product/:id', product.deleteProduct);


module.exports = router;