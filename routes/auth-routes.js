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

Router.post('/register', usernameToLowerCase, function(request, response, next) {
    var user = new User({
        username: request.body.user.username,
        firstname: request.body.user.firstname,
        lastname: request.body.user.lastname
    });

    User.register(user, request.body.user.password, function(error, user) {
        if (error) {
            console.log(error);
        } else {
            console.log("user is " + request.user);
            next();
        }
    });
}, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/posts'
}));

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
