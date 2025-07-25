const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

// Basic validation for country input
const isValidCountry = (data) => {
  return (
    data.name &&
    data.capital &&
    data.population &&
    data.language &&
    data.currency &&
    data.continent &&
    data.independenceYear
  );
};

// GET all countries
const getAllCountries = async (req, res) => {
  try {
    const db = getDb();
    const countries = await db.collection('countries').find().toArray();
    res.status(200).json(countries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve countries', error: err });
  }
};

// GET country by ID
const getCountryById = async (req, res) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);
    const country = await db.collection('countries').findOne({ _id: id });

    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    res.status(200).json(country);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving country', error: err });
  }
};

// POST create country
const createCountry = async (req, res) => {
  try {
    const db = getDb();
    const newCountry = req.body;

    if (!isValidCountry(newCountry)) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const result = await db.collection('countries').insertOne(newCountry);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error creating country', error: err });
  }
};

// PUT update country
const updateCountry = async (req, res) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);
    const updatedData = req.body;

    const result = await db.collection('countries').updateOne(
      { _id: id },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Country not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error updating country', error: err });
  }
};

// DELETE country
const deleteCountry = async (req, res) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection('countries').deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Country not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error deleting country', error: err });
  }
};

module.exports = {
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry
};
