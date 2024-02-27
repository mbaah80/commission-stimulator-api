const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Order CRUD routes
router.get('/allOrders', orderController.getOrders);
router.get('/orders', orderController.getOrdersInRange);
router.post('/orders', orderController.createOrders);
router.put('/orders/:orderId', orderController.updateOrder);
router.delete('/orders/:orderId', orderController.deleteOrder);

module.exports = router;