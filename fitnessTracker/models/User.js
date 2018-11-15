var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    longTerm: [String],
    shortTerm: [String],
    today: [String]
});

mongoose.model('User', UserSchema);