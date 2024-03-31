const database = require('../Services/databaseServices');

const calculateDeliveryPrice = async (req, res) => {
  try {
    
    const {zone, organization_id, total_distance, item_id,} = req.body;

    const query = 'SELECT * FROM pricing WHERE organization_id = $1 AND zone = $2 AND item_id = $3';
    const { rows } = await database.pool.query(query, [organization_id, zone, item_id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: `Pricing data not found for organization_id: ${organization_id} and zone: ${zone}` });
    }

    const priceData = rows[0];

    const totalPrice = calculateTotalPrice(total_distance, priceData);

    return res.status(200).json({ total_price: totalPrice });
  } catch (error) {
    return res.status(500).json({ error: `Error calculating delivery price: ${error.message}` });
  }
};

const calculateTotalPrice = (total_distance, priceData) => {
  // Convert base price and per km rate to cents
  const basePriceCents = priceData.fix_price * 100;
  const perKmRateCents = priceData.km_price * 100;

  if (total_distance < priceData.base_distance_in_km) {
    return basePriceCents;
  }

  const totalPriceCents = basePriceCents + ((total_distance - priceData.base_distance_in_km) * perKmRateCents);

  return totalPriceCents;
};

module.exports = { calculateDeliveryPrice };
