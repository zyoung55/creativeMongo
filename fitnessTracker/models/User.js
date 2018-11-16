var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    longTerm: [String],
    shortTerm: [String],
    daily: [String],
    today: [String]
});

UserSchema.methods.addLong = function(longGoal, cb) {
    console.log("made it!!");
    this.longTerm.push(longGoal);
    this.save(cb);
};

mongoose.model('User', UserSchema);