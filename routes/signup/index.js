const router = require('express').Router();
const addUser = require('./addUser');

  router.get('/', (req, res) => {
    res.status(200).send('Connected');
  });

  module.exports = router;
