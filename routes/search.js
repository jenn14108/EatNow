var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('search', { title: 'Search', search_term:0});
});

router.post('/', function(req, res, next) {
  const search_term = req.body.search_term
  console.log(req.body.search_term)
  res.render('search', { title: 'Search', search_term:search_term});
});

module.exports = router;
