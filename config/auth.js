const jwt = require('express-jwt');

const getTokensFromHeaders = (request) => {
    const { headers: {authorization} } = request;

    if (authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }

    return null;
};

const auth = {
    required: jwt({
        secret: 'fractured-session',
        userProperty: 'payload',
        getToken: getTokensFromHeaders
    }),
    optional: jwt({
        secret: 'fractured-session',
        userProperty: 'payload',
        getToken: getTokensFromHeaders,
        creditialsRequired: false,
    }),
};

module.exports = auth;
