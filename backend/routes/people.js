const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/peopleController');

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
 */
router.post('/', peopleController.createPerson);

/**
 * @swagger
 * /people/{id}:
 *   put:
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
 *       404:
 *         description: Person not found
 */
router.put('/:id', peopleController.updatePerson);

/**
 * @swagger
 * /people/{id}:
 *   delete:
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
 *       404:
 *         description: Person not found
 */
router.delete('/:id', peopleController.deletePerson);

module.exports = router;
