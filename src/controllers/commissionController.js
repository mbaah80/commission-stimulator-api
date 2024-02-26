const Order = require('../models/orderSchema');
const Commission = require('../models/commissionSchema');
const Product = require('../models/productSchema');

const commissionController = {
    // Calculate commissions for a staff member within a specified date range
    calculateCommissions: async (req, res) => {
        try {
            const { staffMember, startDate, endDate } = req.body;
            const orders = await Order.find({ staffMember, date: { $gte: startDate, $lte: endDate } }).populate('products');

            let totalCommission = 0;
            orders.forEach(order => {
                order.products.forEach(product => {
                    totalCommission += (product.price * (product.commissionPercentage / 100));
                });
            });
            const commission = new Commission({
                name:staffMember,
                startDate,
                endDate,
                totalCommission,
                products: orders.map(order => order.products.map(product => ({ productId: product._id, commissionPercentage: product.commissionPercentage }))).flat()
            });
            await commission.save();

            res.json({ totalCommission });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    // apply commission to products

    applyCommission: async (req, res) => {
        try {
            // Extract product IDs and commission percentage from the request body
            const { productIds, commissionPercentage } = req.body;

            // Check if productIds is an array or a single ID
            if (Array.isArray(productIds)) {
                // Bulk update: Iterate over each product ID and update commission percentage
                const updatedProducts = [];
                for (const productId of productIds) {
                    // Find the product by ID
                    const product = await Product.findById(productId);

                    // If product not found, skip to next iteration
                    if (!product) {
                        console.warn(`Product with ID ${productId} not found`);
                        continue;
                    }

                    // Update commission percentage
                    product.commissionPercentage = commissionPercentage;

                    // update the product commissionPercentage
                    await product.save();

                    // Add the updated product to the list of updated products
                    updatedProducts.push(product);
                }

                // Send response with updated products
                return res.json({ message: 'Commission applied successfully to all products', updatedProducts });
            } else {
                // Single update: Update commission percentage for a single product
                const product = await Product.findById(productIds);

                // If product not found, return 404 error
                if (!product) {
                    return res.status(404).json({ message: 'Product not found' });
                }

                // Update commission percentage
                product.commissionPercentage = commissionPercentage;

                // Save the updated product
                await product.save();

                // Send response with the updated product
                return res.json({ message: 'Commission applied successfully to the product', product });
            }
        } catch (error) {
            // Handle errors
            return res.status(500).json({ message: error.message });
        }
    },


    // Get all commission plans
    getAllCommissionPlans: async (req, res) => {
        try {
            const commissionPlans = await CommissionPlan.find();
            res.json(commissionPlans);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get a specific commission plan by ID
    getCommissionPlanById: async (req, res) => {
        try {
            const { planId } = req.params;
            const commissionPlan = await CommissionPlan.findById(planId);
            if (!commissionPlan) {
                return res.status(404).json({ message: 'Commission plan not found' });
            }
            res.json(commissionPlan);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create a new commission plan
    createCommissionPlan: async (req, res) => {
        try {
            const { name, products } = req.body;
            const commissionPlan = new CommissionPlan({ name, products });
            await commissionPlan.save();
            res.status(201).json(commissionPlan);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Update an existing commission plan
    updateCommissionPlan: async (req, res) => {
        try {
            const { planId } = req.params;
            const { name, products } = req.body;
            const commissionPlan = await CommissionPlan.findByIdAndUpdate(planId, { name, products }, { new: true });
            if (!commissionPlan) {
                return res.status(404).json({ message: 'Commission plan not found' });
            }
            res.json(commissionPlan);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Delete a commission plan
    deleteCommissionPlan: async (req, res) => {
        try {
            const { planId } = req.params;
            const commissionPlan = await CommissionPlan.findByIdAndDelete(planId);
            if (!commissionPlan) {
                return res.status(404).json({ message: 'Commission plan not found' });
            }
            res.json({ message: 'Commission plan deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


};

module.exports = commissionController;
