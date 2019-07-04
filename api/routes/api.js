const express = require('express');
const router = express.Router();
const { primes, median } = require('../lib');

/* GET users listing. */
router.get('/medianprime', function(req, res, next) {
  let { n } = req.query;
  if (!n || isNaN(parseInt(n, 10)) || parseInt(n, 10) <= 0) {
    res.status(400);
    res.send({'error': 'n must be an integer'});
  }

  n = parseInt(n, 10);

  res.send({ result: median(primes(n)) });
});

module.exports = router;
