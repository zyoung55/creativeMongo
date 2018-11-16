var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false}));
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'public' });
});

/* Finds a user and returns username if found. */
router.get('/users', function(req, res, next) {
    User.find({username : req.query.username, password: req.query.password}, function(err, user) {
      if(err) { return next(err); }
      if (user[0]) {
        res.send(user[0]["username"]);
      }
      else 
        res.send('');
    });
}); 

/* Checks to see if a user exists. */
router.param('findIfUserExists', function(req, res, next, name) {
  User.find({username : name}, function(err, user) {
    if(err) { return next(err); }
    if(user[0]) { return next(new Error("Aldready a user with specified username")); }
    return next();
  });
});

/*If user has not already been created, add them. */
router.post('/users/:findIfUserExists', function(req, res, next) {
  var user = new User(req.body);
  user.save(function(err, user) {
    if(err){ return next(err); }
    if (user) {
      res.send(user['username']);
    }
    else {
      res.render('error', next);
    }
  });
});

/*Find a user in the database and relay them to another section of this file. */
router.param('findUser', function(req, res, next, name) {
  User.find({username : name}, function(err, user) {
    if(err) { return next(err); };
    if (!user[0]) { 
      return next(new Error("There is no user with that specified username."));
    }
    req.user = user[0];
    return next();
  });
});

/*Get the goals for a user. */
router.get('/getList/:findUser', function(req, res, next) {
  res.send(req.user.longTerm);
})

/* Delete a goal or add a new goal. */
router.put('/putList/:findUser', function(req, res, next) {
  if(req.body.deleteGoal) {
    var deleteString = req.body.deleteGoal;
    deleteString = deleteString.toString("utf8");
    for (var i = 0; i < req.user.longTerm.length; ++i) {
      if (req.user.longTerm[i] === deleteString) {
        var documentString = req.user.longTerm[i];
        documentString = documentString.toString('utf8');
        req.user.updateOne({$pull: {'longTerm': documentString} }, function(err, user) {
          if (err) { return next(err) };
            res.send(req.user.longTerm);
            return;
        });
      }
    }
  }
  else {
    req.user.addLong(req.body.listItem, function(err, user) {
    if(err) { return next(err); }
      res.send(req.body.listItem);
    })
  }
});

module.exports = router;

