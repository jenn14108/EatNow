var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('recentSearches', { title: 'Recent Searches' });
});

module.exports = router;
