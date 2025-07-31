const express = require('express');
const router = express.Router();
const countriesController = require('../controllers/countriesController');
const { verifyToken } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /countries/:
 *   get:
 *     summary: Get all countries
 *     tags: [Countries]
 *     responses:
 *       200:
 *         description: List of countries
 *       500:
 *         description: Internal Server Error
 */
router.get('/', countriesController.getAllCountries);

/**
 * @swagger
 * /countries/{id}:
 *   get:
 *     summary: Get a country by ID
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The country ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Country found
 *       404:
 *         description: Country not found
 */
router.get('/:id', countriesController.getCountryById);

/**
 * @swagger
 * /countries/:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new country
 *     tags: [Countries]
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
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/', verifyToken, countriesController.createCountry);

/**
 * @swagger
 * /countries/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a country by ID
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The country ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/CountryUpdate'
 *     responses:
 *       200:
 *         description: Country updated
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Country not found
 */
router.put('/:id', verifyToken, countriesController.updateCountry);

/**
 * @swagger
 * /countries/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a country
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The country ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Country deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Country not found
 */
router.delete('/:id', verifyToken, countriesController.deleteCountry);

module.exports = router;
