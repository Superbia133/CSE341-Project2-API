const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Mawyim API',
    description: 'API for managing countries and related people in the world of Mawyim',
    version: '1.0.0',
  },
  host: 'cse341-project2-api.onrender.com', // ✅ Change this to your actual Render subdomain
  schemes: ['https'], // ✅ Use https for deployment
  tags: [
    {
      name: 'Countries',
      description: 'Country CRUD routes',
    },
    {
      name: 'People',
      description: 'People CRUD routes',
    },
    {
      name: 'Auth',
      description: 'Login and register routes',
    },
  ],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'JWT Authorization header. Example: Bearer {token}',
    },
  },
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
    AuthLogin: {
      email: 'test@example.com',
      password: '123456',
    },
    AuthRegister: {
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('✅ Swagger docs generated');
});
