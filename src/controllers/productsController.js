const Product = require('../models/productSchema');

const productsController = {
    // Get all products
    getAllProducts: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 50; // Parse the limit (number of products per page) from the query parameters, default to 10 if not provided

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            const products = await Product.find().skip(startIndex).limit(limit).lean();

            // Modify each product object to change _id to id
            products.forEach(product => {
                product.id = product._id;
                delete product._id;
            });

            res.json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    // Create a new product
    createProducts: async (req, res) => {
        try {
            let productsData = req.body;

            // Check if productsData is not an array, convert it to an array with a single object
            if (!Array.isArray(productsData)) {
                productsData = [productsData];
            }

            // Create an array to store promises for saving each product
            const productPromises = productsData.map(productData => {
                const { name, category, price, commissionPercentage } = productData;

                // Set commissionPercentage to 0 if not provided or undefined
                const commission = commissionPercentage !== undefined ? commissionPercentage : 0;


                const product = new Product({ name, category, price, commissionPercentage: commission});
                return product.save();
            });

            // Execute all save operations in parallel
            const savedProducts = await Promise.all(productPromises);

            res.status(201).json({ message: 'Products created successfully', products: savedProducts });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },


    // Update an existing product
    updateProduct: async (req, res) => {
        try {
            const { productId } = req.params;
            const { name, category, price, commissionPercentage } = req.body;
            const product = await Product.findByIdAndUpdate(productId, { name, category, price, commissionPercentage }, { new: true });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Delete a product
    deleteProduct: async (req, res) => {
        try {
            const { productId } = req.params;
            const product = await Product.findByIdAndDelete(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = productsController;
