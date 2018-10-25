var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var express = require('express');
var app = express();

mongoose.connect("mongodb://localhost/fractured-blog-db");
mongoose.set('debug', true);

app.set('view engine', 'ejs'); // Tells express to use ejs to render our web pages server-side
app.use(express.static("public")); // Creates a static directory in 'public' that is unchanging
app.use(bodyParser.urlencoded({extended: true})); // Sets up body parser for RESTful APIs
app.use(methodOverride('_method'));
app.use(session({ secret: 'fractured-session', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

// MONGOOSE SCHEMAS
// --------------------------------------
require('./models/user');
require('./models/post');

// SETUP AUTHENTICATION
// --------------------------------------
require('./auth')

// ROUTES
// --------------------------------------
app.use(require('./routes/index-routes'));
app.use(require('./routes/post-routes'));

// APP START
// --------------------------------------
app.listen(3000, function() {
  console.log("Server has started.");
});
