const express = require('express');
const router = express.Router();
const commissionController = require('../controllers/commissionController');

// Commission CRUD routes
router.post('/commissions/calculate', commissionController.calculateCommissions);
router.post('/commissions/bulk', commissionController.applyCommission);
router.get('/commissions', commissionController.getAllCommissionPlans);
router.get('/commissions/:commissionId', commissionController.getCommissionPlanById);
router.post('/commissions', commissionController.createCommissionPlan);
router.put('/commissions/:commissionId', commissionController.updateCommissionPlan);
router.delete('/commissions/:commissionId', commissionController.deleteCommissionPlan);

module.exports = router;
