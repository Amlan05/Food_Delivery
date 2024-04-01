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
 *               organization_id:
 *                 type: string
 *               total_distance:
 *                 type: number
 *               item_id:
 *                 type: string
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Success'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
router.post('/deliveryPrice', deliveryController.calculateDeliveryPrice);

module.exports = router;
