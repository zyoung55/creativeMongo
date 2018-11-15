var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

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

router.param('findUser', function(req, res, next, name) {
  console.log("made it into param");
  User.find({username : name}, function(err, user) {
    console.log("did something!");
    if(err) { return next(err); }
    if(user[0]) { console.log("OH NO!"); return next(new Error("Aldready a user with specified username")); }
    return next();
  });
});

router.post('/users/:findUser', function(req, res, next) {
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
    
module.exports = router;

/*{data: "<!DOCTYPE html><html><head><title></title><link re…l/process/next_tick.js:104:9)</pre></body></html>", status: 500, headers: ƒ, config: {…}, statusText: "Internal Server Error", …}
config: {method: "POST", transformRequest: Array(1), transformResponse: Array(1), paramSerializer: ƒ, jsonpCallbackParam: "callback", …}
data: "<!DOCTYPE html><html><head><title></title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Aldready a user with specified username</h1><h2></h2><pre>Error: Aldready a user with specified username↵    at /var/www/html/creativeMongoLab/fitnessTracker/routes/index.js:31:54↵    at /var/www/html/creativeMongoLab/fitnessTracker/node_modules/mongoose/lib/model.js:4527:16↵    at process.nextTick (/var/www/html/creativeMongoLab/fitnessTracker/node_modules/mongoose/lib/helpers/query/completeMany.js:35:39)↵    at _combinedTickCallback (internal/process/next_tick.js:73:7)↵    at process._tickCallback (internal/process/next_tick.js:104:9)</pre></body></html>"
headers: ƒ (d)
status: 500
statusText: "Internal Server Error"
xhrStatus: "complete"
__proto__: Object
*/


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
