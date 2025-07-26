const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Mawyim World API',
    description: 'Project 2 API for managing countries and people in the world of Mawyim',
  },
  host: 'localhost:3000', // Change this to your Render domain when deployed
  schemes: ['http'], // 'https' for deployed version
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
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
