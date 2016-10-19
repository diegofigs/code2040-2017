var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: "Diego's code2040-2017 Express API" });
});

module.exports = router;
