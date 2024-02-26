const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');

// Product CRUD routes
router.get('/products', productController.getAllProducts);
router.post('/products', productController.createProducts);
router.put('/products/:productId', productController.updateProduct);
router.delete('/products/:productId', productController.deleteProduct);


module.exports = router;
