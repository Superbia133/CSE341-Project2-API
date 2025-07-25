const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/peopleController');

router.get('/', peopleController.getAllPeople);
router.get('/:id', peopleController.getPersonById);
router.post('/', peopleController.createPerson);
router.put('/:id', peopleController.updatePerson);
router.delete('/:id', peopleController.deletePerson);

module.exports = router;
