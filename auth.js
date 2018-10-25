const localStrategy = require('passport-local');
const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('User');

passport.use(new localStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, (email, password, done) => {
  User.findOne({ email }).then((user) => {
    if (!user || !user.validatePassword(password)) {
      return done(null, false, {errors: { 'email or password': 'is invalid'}});
    }

    return done(null, user);
  }).catch(done);
}));
