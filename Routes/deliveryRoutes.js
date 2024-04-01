const express = require('express');
const router = express.Router();
const deliveryController = require('../Controllers/deliveryController');

/**
 * @swagger
 * /deliveryPrice:
 *   get:
 *     summary: Calculate delivery price
 *     description: Calculate the delivery price based on provided parameters.
 *     parameters:
 *       - in: query
 *         name: zone
 *         required: true
 *         schema:
 *           type: string
 *         description: The delivery zone.
 *       - in: query
 *         name: organization_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The organization ID.
 *       - in: query
 *         name: total_distance
 *         required: true
 *         schema:
 *           type: number
 *         description: The total distance of the delivery.
 *       - in: query
 *         name: item_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The item ID.
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/deliveryPrice', deliveryController.calculateDeliveryPrice);

module.exports = router;
