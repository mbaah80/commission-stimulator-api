const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    staffMember: { type: String, required: true },
    date: {
        type: Date
    },
});

module.exports = mongoose.model('Order', orderSchema);
