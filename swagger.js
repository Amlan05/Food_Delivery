const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Food Delivery',
      version: '1.0.0',
      description: 'Documentation for your RESTful API',
    },
  },
  apis: [`${__dirname}/Routes/deliveryRoutes`],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
