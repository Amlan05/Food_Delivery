const database = require('../Services/databaseServices');

const createPricingTable = async () => {
  try {
    await database.pool.query(`
    CREATE TABLE IF NOT EXISTS pricing (
      id SERIAL PRIMARY KEY,
      organization_id INTEGER REFERENCES organizations(id),
      item_id INTEGER REFERENCES items(id),
      zone VARCHAR(50) NOT NULL,
      base_distance_in_km INTEGER NOT NULL,
      km_price DECIMAL(10,2) NOT NULL,
      fix_price DECIMAL(10,2) NOT NULL
    )
  `);
    console.log('Pricing table created successfully');
  } catch (error) {
    console.error('Error creating pricing table:', error);
  }
};

const insertInitialPricing = async () => {
  const existingPricing = await database.pool.query('SELECT COUNT(*) FROM pricing');
  if (existingPricing.rows[0].count === '0') {
    const pricingData = [
      {
        organization_id: 1, item_id: 1, zone: 'central', base_distance_in_km: 5, km_price: 1.5, fix_price: 10,
      },
      {
        organization_id: 1, item_id: 2, zone: 'central', base_distance_in_km: 5, km_price: 2, fix_price: 12,
      },
      {
        organization_id: 2, item_id: 1, zone: 'north', base_distance_in_km: 7, km_price: 1.6, fix_price: 11,
      },
    ];

    const insertQuery = `
    INSERT INTO pricing (organization_id, item_id, zone, base_distance_in_km, km_price, fix_price)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;

    const insertedPricing = [];

    for (const pricing of pricingData) {
      const {
        organization_id, item_id, zone, base_distance_in_km, km_price, fix_price,
      } = pricing;
      const { rows } = await database.pool.query(insertQuery, [organization_id, item_id, zone, base_distance_in_km, km_price, fix_price]);
      insertedPricing.push(rows[0]);
    }

    return insertedPricing;
  }
};

module.exports = { createPricingTable, insertInitialPricing };
