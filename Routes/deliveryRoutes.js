const express = require('express');
const router = express.Router();
const deliveryController = require('../Controllers/deliveryController');

/**
 * @swagger
 * /deliveryPrice:
 *   post:
 *     summary: Calculate delivery price
 *     description: Calculate the delivery price based on provided parameters.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               zone:
 *                 type: string
 *                 description: The delivery zone.
 *               organization_id:
 *                 type: integer
 *                 description: The organization ID.
 *               total_distance:
 *                 type: number
 *                 description: The total distance of the delivery.
 *               item_id:
 *                 type: string
 *                 description: The item ID.
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_price:
 *                   type: number
 *                   description: The calculated total price for the delivery.
 *       404:
 *         description: Pricing data not found
 *       500:
 *         description: Internal server error
 */
router.post('/deliveryPrice', deliveryController.calculateDeliveryPrice);

module.exports = router;
