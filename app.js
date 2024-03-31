const express = require('express');

const { createOrganizationTable } = require('./Model/organisationModel');
const { createPricingTable } = require('./Model/priceModel');
const { createItemTable } = require('./Model/itemModel');
const { insertInitialOrganizations } = require('./Model/organisationModel');
const { insertInitialItems } = require('./Model/itemModel');
const { insertInitialPricing } = require('./Model/priceModel');
const swaggerDocs = require('./swagger');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(require('./Routes/deliveryRoutes'));

const port = process.env.PORT || 5000;

swaggerDocs(app);

const startApp = async () => {
  try {
    await createOrganizationTable();
    await insertInitialOrganizations();
    await createItemTable();
    await insertInitialItems();
    await createPricingTable();
    await insertInitialPricing();
    app.listen(port, () => {
      console.log('Server started');
    });
  } catch (error) {
    console.error('Error initializing application:', error);
    process.exit(1);
  }
};

startApp();
