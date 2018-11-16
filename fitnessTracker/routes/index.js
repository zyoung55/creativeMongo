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

router.get('/users', function(req, res, next) {
    console.log("In verify sign in");
    console.log("UserInfo: " + req.query.username);
    console.log("UserPassword: " + req.query.password);
    User.find({username : req.query.username, password: req.query.password}, function(err, user) {
      if(err) { return next(err); }
      console.log(user);
      if (user[0]) {
        res.send(user[0]["username"]);
      }
      else 
        res.send('');
    });
}); 

router.param('findIfUserExists', function(req, res, next, name) {
  console.log("made it into param");
  User.find({username : name}, function(err, user) {
    console.log("did something!");
    if(err) { return next(err); }
    if(user[0]) { console.log("OH NO!"); return next(new Error("Aldready a user with specified username")); }
    return next();
  });
});

router.post('/users/:findIfUserExists', function(req, res, next) {
  console.log("In users post");
  console.log(req.body);
  var user = new User(req.body);
  user.save(function(err, user) {
    if(err){ return next(err); }
    if (user) {
      console.log("hello");
      console.log("USER[0]" + user['username']);
      res.send(user['username']);
    }
    else {
      console.log("Hey");
      res.render('error', next);
    }
  });
});

router.param('findUser', function(req, res, next, name) {
  console.log("made it into param2");
  User.find({username : name}, function(err, user) {
    console.log("Did something");
    if(err) { return next(err); };
    if (!user[0]) { 
      return next(new Error("There is no user with that specified username."));
    }
    req.user = user[0];
    return next();
  });
});

router.get('/getList/:findUser', function(req, res, next) {
  console.log("In getList");
  console.log(req.user);
  res.send(req.user.longTerm);
})

router.put('/putList/:findUser', function(req, res, next) {
  if(req.body.deleteGoal) {
    console.log("req.body.deleteGoal" + req.body.deleteGoal);
    console.log("Hey oh!!!");
    var deleteString = req.body.deleteGoal;
    deleteString = deleteString.toString("utf8");
    for (var i = 0; i < req.user.longTerm.length; ++i) {
      console.log("deleteGoal: + " + "/" + req.body.deleteGoal + "/");
      console.log("/" + req.user.longTerm[i] + "/");
      if (req.user.longTerm[i] === deleteString) {
        console.log(";)");
        //{ $pull: { connections : { _id : connId } } },
        //Favorite.update( {cn: req.params.name}, { $pullAll: {uid: [req.params.deleteUid] } } )
        //{$pull: {members: {tweetID: '5327010328645530500'}}}, 
        var documentString = req.user.longTerm[i];
        documentString = documentString.toString('utf8');
        //documentString = JSON.stringify(documentString);
        console.log("documentString" + documentString);
        req.user.update({$pull: {longTerm : documentString}}, {safe: true});
        return;
        /*req.user.save(function(err, user) {
          if(err) { return next(err); }
          return;
        })*/
      }
    }
    return;
  }
  console.log("In users post!");
  console.log("Request user: " + req.user);
  console.log("Req body:" + req.body.listItem);
  req.user.addLong(req.body.listItem, function(err, user) {
    if(err) { console.log("WHY???!!!"); return next(err); }
    res.send(req.body.listItem);
  })
});

router.delete('/deleteList/:findUser', function(req, res, next) {
  console.log("In delete list!!!");
  console.log("Delete Goal: " + req.body.foo);
  console.log("DELETE USER: " + req.user);
})



module.exports = router;

/*[
{
longTerm: [ ],
shortTerm: [ ],
today: [ ],
_id: "5bec9c2d4cce823aa87f854d",
username: "Jeff",
password: "a",
__v: 0
}
]*/
