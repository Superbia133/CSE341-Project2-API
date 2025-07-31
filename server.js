const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initDb } = require('./backend/db/connect');
const countryRoutes = require('./backend/routes/countries');
const peopleRoutes = require('./backend/routes/people');
const authRoutes = require('./backend/routes/auth'); // ✅ NEW

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/countries', countryRoutes);
app.use('/people', peopleRoutes);
app.use('/auth', authRoutes); // ✅ NEW

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root Route
app.get('/', (req, res) => {
  res.send('🌍 Welcome to the Countries & People API');
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
