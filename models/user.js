const passportLocalMongoose =  require('passport-local-mongoose');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    title: {type: String, default: ""},
    bio: {type: String, default: ""},
    accessLevel: {type: String, default: "User"}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
