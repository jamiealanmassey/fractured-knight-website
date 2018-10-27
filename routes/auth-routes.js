const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express');

const User = mongoose.model('User');
const Router = express.Router();

Router.get('/register', function(request, response) {
    response.render('register');
});

Router.post('/register', function(request, response) {
    var username = request.body.user.email.toLowerCase();
    var password = request.body.user.password;
    var firstname = request.body.user.firstname;
    var lastname = request.body.user.lastname;

    User.register(new User({ username: username, firstname: firstname, lastname: lastname }), password, function(error, user) {
        if (error) {
            console.log(error);
            return res.render('register');
        }

        passport.authenticate('local')(request, response, function() {
            response.redirect('/');
        });
    });
});

Router.get('/login', function(request, response) {
    response.render('login');
});

Router.post('/login', passport.authenticate('local', {
    successRedirect: '/posts',
    failureRedirect: '/login'
}), function(request, response) {
    // Callback
});

module.exports = Router;
