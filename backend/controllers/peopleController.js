const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

// Helper to validate person object
const isValidPerson = (data) => {
  return data.name && data.role && data.birthYear && data.countryId && data.description;
};

// GET all people
const getAllPeople = async (req, res) => {
  try {
    const db = getDb();
    const people = await db.collection('people').find().toArray();
    res.status(200).json(people);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve people', error: err });
  }
};

// GET one person by ID
const getPersonById = async (req, res) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);
    const person = await db.collection('people').findOne({ _id: id });

    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.status(200).json(person);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving person', error: err });
  }
};

// POST create new person
const createPerson = async (req, res) => {
  try {
    const db = getDb();
    const newPerson = req.body;

    if (!isValidPerson(newPerson)) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Convert countryId to ObjectId
    newPerson.countryId = new ObjectId(newPerson.countryId);

    const result = await db.collection('people').insertOne(newPerson);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error creating person', error: err });
  }
};

// PUT update person
const updatePerson = async (req, res) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);
    const updatedData = req.body;

    if (updatedData.countryId) {
      updatedData.countryId = new ObjectId(updatedData.countryId);
    }

    const result = await db.collection('people').updateOne(
      { _id: id },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error updating person', error: err });
  }
};

// DELETE person
const deletePerson = async (req, res) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection('people').deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error deleting person', error: err });
  }
};

module.exports = {
  getAllPeople,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson,
};
