const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/products - Get all products with pagination and search
router.get('/', productController.getProducts);

// GET /api/products/:id - Get single product by ID or slug
router.get('/:id', productController.getProduct);

// POST /api/products - Create product (for admin/seeding)
router.post('/', productController.createProduct);

module.exports = router;

