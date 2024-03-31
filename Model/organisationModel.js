const database = require('../Services/databaseServices');

const createOrganizationTable = async () => {
  try {
    await database.pool.query(`
    CREATE TABLE IF NOT EXISTS organizations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(25) NOT NULL
    )
  `);
    console.log('Organizations table created successfully');
  } catch (error) {
    console.error('Error creating organizations table:', error);
  }
};

const insertInitialOrganizations = async () => {
  const existingOrganizations = await database.pool.query('SELECT COUNT(*) FROM organizations');
  if (existingOrganizations.rows[0].count === '0') {
    const organizations = [
      { name: 'Organization 1' },
      { name: 'Organization 2' },
      { name: 'Organization 3' },
    ];

    const insertQuery = 'INSERT INTO organizations (name) VALUES ($1) RETURNING *';

    const insertedOrganizations = [];

    for (const org of organizations) {
      const { name } = org;
      const { rows } = await database.pool.query(insertQuery, [name]);
      insertedOrganizations.push(rows[0]);
    }

    return insertedOrganizations;
  }
};

module.exports = { createOrganizationTable, insertInitialOrganizations };
