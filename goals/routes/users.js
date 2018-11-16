var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.sendFile('users.html', { root: 'public' });
});

module.exports = router;
