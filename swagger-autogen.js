const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Countries API',
    description: 'API for managing countries and related people',
  },
  host: 'localhost:3000', // Change to your Render URL when deploying
  schemes: ['http'],
  definitions: {
    Country: {
      $name: 'Fortia',
      $capital: 'Virel',
      $continent: 'Mawyim',
      $population: 3000000,
      $currency: 'Amber Coin',
      $language: 'Fortian',
      $government: 'Divine Monarchy',
    },
    CountryUpdate: {
      name: 'Fortia Prime',
      capital: 'New Virel',
      population: 5000000,
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js']; // Make sure this path matches your entry file

swaggerAutogen(outputFile, endpointsFiles, doc);
