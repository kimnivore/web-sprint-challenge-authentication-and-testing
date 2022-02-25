// do not make changes to this file
const router = require('express').Router();
const jokes = require('./jokes-data');
//const { restricted } = require('../middleware/restricted');
const Jokes = require('./jokes-model');

router.get('/', async (req, res) => {
  try {
    const jokes = await Jokes.get()
    res.status(200).json(jokes);
  } catch(error) {
    next(error)
  }
});

module.exports = router;
