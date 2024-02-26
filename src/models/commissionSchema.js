const mongoose = require('mongoose');

const commissionPlanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        commissionPercentage: { type: Number, required: true },
    }],
    totalCommission: { type: Number, default: 0 },
});

module.exports = mongoose.model('CommissionPlan', commissionPlanSchema);
