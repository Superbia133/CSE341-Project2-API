const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Countries API',
    description: 'API for managing countries and related people',
    version: '1.0.0',
  },
  host: 'localhost:3000', // 🔁 Change to 'cse341-project2-api.onrender.com' when deployed
  schemes: ['http'],      // 🔁 Change to ['https'] when deployed
  tags: [
    {
      name: 'Countries',
      description: 'Country CRUD routes',
    },
  ],
  definitions: {
    Country: {
      name: 'Fortia',
      capital: 'Glasfort',
      population: 5000000,
      language: 'Fortic',
      currency: 'Gold Talons',
      continent: 'Mawyim',
      independenceYear: 813,
    },
    CountryUpdate: {
      name: 'Updatedland',
      capital: 'Newcapital',
      population: 7500000,
      language: 'Updatedish',
      currency: 'Silver Talons',
      continent: 'Updated Continent',
      independenceYear: 900,
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js']; // Only server.js for scanning routes and docs

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('✅ Swagger docs generated');
});
