const database = require('../Services/databaseServices');

const createItemTable = async () => {
  try {
    await database.pool.query(`
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      type VARCHAR(50) NOT NULL,
      description TEXT
    )
  `);
    console.log('Items table created successfully');
  } catch (error) {
    console.error('Error creating items table:', error);
  }
};

const insertInitialItems = async () => {
  const existingItems = await database.pool.query('SELECT COUNT(*) FROM items');

  if (existingItems.rows[0].count === '0') {
    const items = [
      { type: 'perishable', description: 'Perishable Item 1' },
      { type: 'perishable', description: 'Perishable Item 2' },
      { type: 'non-perishable', description: 'Non-Perishable Item 1' },
    ];

    const insertQuery = 'INSERT INTO items (type, description) VALUES ($1, $2) RETURNING *';

    const insertedItems = [];

    for (const item of items) {
      const { type, description } = item;
      const { rows } = await database.pool.query(insertQuery, [type, description]);
      insertedItems.push(rows[0]);
    }

    return insertedItems;
  }
};

module.exports = { createItemTable, insertInitialItems };
