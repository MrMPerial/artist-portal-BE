const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).send('Looks like we\'re up and running!')
});

module.exports = router;
