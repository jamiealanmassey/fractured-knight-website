var methodOverride = require('method-override');
var localStrategy = require('passport-local');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var express = require('express');
var app = express();

mongoose.connect("mongodb://localhost/fractured-blog-db");
mongoose.set('debug', true);

app.use(session({
    secret: 'fractured-session-secret',
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs'); // Tells express to use ejs to render our web pages server-side
app.use(express.static('public')); // Creates a static directory in 'public' that is unchanging
app.use(bodyParser.urlencoded({extended: true})); // Sets up body parser for RESTful APIs
app.use(methodOverride('_method')); // Tells express to use method-overriding e.g. ?_method=PUT
app.use(passport.initialize()); // Sets up passport to be used by express as a plugin container
app.use(passport.session()); // Starts the passport session to be used throughout website

app.use(function(request, response, next) {
    response.locals.currentUser = request.user;
    next();
});

// MONGOOSE SCHEMAS
// --------------------------------------
var User = require('./models/user');
var Post = require('./models/post');

// SETUP AUTHENTICATION
// --------------------------------------
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTES
// --------------------------------------
app.use('/', require('./routes/auth-routes'));
app.use('/', require('./routes/index-routes'));
app.use(require('./routes/post-routes'));
app.use(require('./routes/comment-routes'));

// APP START
// --------------------------------------
app.listen(3000, function() {
    console.log("Server has started.");
});
