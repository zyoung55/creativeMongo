/*User model*/
var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    longTerm: [String],
});

UserSchema.methods.addLong = function(longGoal, cb) {
    this.longTerm.push(longGoal);
    this.save(cb);
};

mongoose.model('User', UserSchema);