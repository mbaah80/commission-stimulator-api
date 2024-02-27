const Order = require('../models/orderSchema');

const orderController = {
    // Get all orders within a specified date range
    getOrdersInRange: async (req, res) => {
        try {
            const { startDate, endDate } = req.query;
            const orders = await Order.find({ date: { $gte: startDate, $lte: endDate } });
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    // Get all orders
    getOrders: async (req, res) => {
        try {
            const orders = await Order.find();
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create a new order
    createOrders: async (req, res) => {
        try {
            let ordersData = req.body;

            // Check if ordersData is not an array, convert it to an array with a single object
            if (!Array.isArray(ordersData)) {
                ordersData = [ordersData];
            }

            // Validate if orders array is not empty
            if (ordersData.length === 0) {
                return res.status(400).json({ message: 'Orders data is required and cannot be empty' });
            }

            // Create an array to store promises for saving each order
            const orderPromises = ordersData.map(orderData => {
                const { products, staffMember } = orderData;
                const order = new Order({
                    products,
                    staffMember,
                    date: new Date().toISOString().split('T')[0],
                });
                return order.save();
            });

            // Execute all save operations in parallel
            const savedOrders = await Promise.all(orderPromises);

            res.status(201).json({ message: 'Orders created successfully', orders: savedOrders });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },


    // Update an existing order
    updateOrder: async (req, res) => {
        try {
            const { orderId } = req.params;
            const { products, staffMember } = req.body;
            const order = await Order.findByIdAndUpdate(orderId, { products, staffMember }, { new: true });
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(order);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Delete an order
    deleteOrder: async (req, res) => {
        try {
            const { orderId } = req.params;
            const order = await Order.findByIdAndDelete(orderId);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json({ message: 'Order deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = orderController;
