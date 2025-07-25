const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initDb } = require('./backend/db/connect');
const countryRoutes = require('./backend/routes/countries'); // ✅ updated with correct path

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/**
 * @swagger
 * /countries:
 *   get:
 *     tags:
 *       - Countries
 *     description: Get all countries
 *     responses:
 *       200:
 *         description: OK
 *   post:
 *     tags:
 *       - Countries
 *     description: Create a new country
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Country'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *
 * /countries/{id}:
 *   get:
 *     tags:
 *       - Countries
 *     description: Get a country by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *
 *   put:
 *     tags:
 *       - Countries
 *     description: Update a country by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/CountryUpdate'
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *
 *   delete:
 *     tags:
 *       - Countries
 *     description: Delete a country by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not Found
 */

// Routes
app.use('/countries', countryRoutes);

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root
app.get('/', (req, res) => {
  res.send('🌍 Welcome to the Countries API');
});

// Start Server after DB Initialization
const port = process.env.PORT || 3000;

initDb((err) => {
  if (err) {
    console.error('❌ Failed to connect to database:', err);
  } else {
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  }
});
