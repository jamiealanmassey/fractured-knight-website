const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express');

const User = mongoose.model('User');
const Router = express.Router();

function usernameToLowerCase(request, response, next){
    if (request.body.user && request.body.user.username) {
        request.body.user.username = request.body.user.username.toLowerCase();
        next();
    } else if (request.body.username) {
        console.log("body: " + request.body);
        console.log("username: " + request.body.username);

        request.body.username = request.body.username.toLowerCase();
        next();
    }
}

Router.get('/register', function(request, response) {
    response.render('register');
});

Router.post('/register', usernameToLowerCase, function(request, response) {
    var username = request.body.user.username;
    var password = request.body.user.password;
    var firstname = request.body.user.firstname;
    var lastname = request.body.user.lastname;

    User.register(new User({ username: username, firstname: firstname, lastname: lastname }), password, function(error, user) {
        if (error) {
            console.log(error);
            return response.render('register');
        }

        passport.authenticate('local')(request, response, function() {
            response.redirect('/posts');
        });
    });
});

Router.get('/login', function(request, response) {
    response.render('login');
});

Router.post('/login', usernameToLowerCase, passport.authenticate('local', {
    successRedirect: '/posts',
    failureRedirect: '/login'
}), function(request, response) {
    // Callback
});

Router.get('/logout', function(request, response) {
    request.logout();
    response.redirect('/posts');
});

module.exports = Router;
