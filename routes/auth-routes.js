const auth = require('../config/auth');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const express = require('express');
const router = express.Router();

app.post('/login', auth.optional, function(request, response, next) {
    const { body: { user }} = request;

    if (!user.email) {
        return response.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!user.password) {
        return response.status(422).json({
            errors: {
                password: 'is required';
            },
        });
    }

    return passport.authenticate('local', { session: false }, (error, passUser, info) => {
        if (error) {
            return next(error);
        }

        if (passUser) {
            const user = passUser;
            user.token = passUser.generateJWT();

            return response.json({ user: user.toAuthJSON() });
        }

        return status(400).info;
    })(request, response, next);
});

module.exports = router;
