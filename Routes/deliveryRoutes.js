const router = require('express').Router();
const deliveryController = require('../Controllers/deliveryController');

// get products
router.get('/deliveryPrice', deliveryController.calculateDeliveryPrice);

module.exports = router;
