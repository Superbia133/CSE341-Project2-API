const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/peopleController');
const { verifyToken } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: People
 *   description: API for managing characters or citizens in Mawyim
 */

/**
 * @swagger
 * /people/:
 *   get:
 *     summary: Get all people
 *     tags: [People]
 *     responses:
 *       200:
 *         description: List of people
 *       500:
 *         description: Internal Server Error
 */
router.get('/', peopleController.getAllPeople);

/**
 * @swagger
 * /people/{id}:
 *   get:
 *     summary: Get a person by ID
 *     tags: [People]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB document ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Person found
 *       404:
 *         description: Person not found
 */
router.get('/:id', peopleController.getPersonById);

/**
 * @swagger
 * /people/:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new person
 *     tags: [People]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - role
 *               - birthYear
 *               - countryId
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               birthYear:
 *                 type: integer
 *               countryId:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Person created
 *       400:
 *         description: Missing or invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', verifyToken, peopleController.createPerson);

/**
 * @swagger
 * /people/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update an existing person
 *     tags: [People]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               birthYear:
 *                 type: integer
 *               countryId:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Person updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Person not found
 */
router.put('/:id', verifyToken, peopleController.updatePerson);

/**
 * @swagger
 * /people/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a person by ID
 *     tags: [People]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Person deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Person not found
 */
router.delete('/:id', verifyToken, peopleController.deletePerson);

module.exports = router;
