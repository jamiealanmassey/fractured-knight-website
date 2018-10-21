var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var express = require('express');
var app = express();

mongoose.connect("mongodb://localhost/fractured-blog-db");

app.set('view engine', 'ejs'); // Tells express to use ejs to render our web pages server-side
app.use(express.static("public")); // Creates a static directory in 'public' that is unchanging
app.use(bodyParser.urlencoded({extended: true})); // Sets up body parser for RESTful APIs

// MONGOOSE
// --------------------------------------
var postSchema = new mongoose.Schema({
  title: String,
  subheading: String,
  image: {type: String, default: "img/image-banner-default.jpg"},
  content: String,
  created: {type: Date, default: Date.now},
  author: String,
  tags: [String]
});

var Post = mongoose.model("Post", postSchema);

/*Post.create({
  title: "Blog Post #1",
  subheading: "It begins",
  content: "This is the first blog post!",
  author: "Jamie Massey",
  tags: ["development", "programming"]
});*/

// ROUTES
// --------------------------------------
app.get('/', function(request, response) {
  response.render("index"); // TEMP
});

app.get('/developers', function(request, response) {
  response.send("/developers SHOW");
});

app.get('/posts', function(request, response) {
  Post.find({}, function(err, posts) {
    if (err) {
      console.log("error");
    } else {
      response.render("posts", {posts: posts});
    }
  });

  //response.render("posts");
  //response.send("/posts SHOW");
});

app.get('/posts/new', function(request, response) {
  response.send("/posts/new NEW");
});

app.get('/posts/:id', function(request, response) {
  var posts = [
    { title: "Blog Post #1", image: "https://cdn.lynda.com/course/520220/520220-636136853521823826-16x9.jpg", subheading: "First blog post ever!", content: "Blah blah blah this is a blog posts xD", tags: ["yeet", "yote"] },
    { title: "Blog Post #2", image: "https://www.un.org/development/desa/capacity-development/wp-content/uploads/sites/66/2017/12/DESA-and-China-on-science-and-technology-848x463.jpg", subheading: "Second blog post ever!", content: "Blah blah blah this is another blog post", tags: ["yeet", "fun"] }
  ];

  response.send("/posts/:id SHOW")
  //response.render("posts", {posts:posts});
});

app.get('/posts/:id/edit', function(request, response) {
  response.send("/posts/:id/edit EDIT");
});

app.post('/posts/:id', function(request, response) {
  response.send("/posts/:id UPDATE");
});

/*app.post('/posts', function(request, response) {
  response.send("/posts CREATE");
});*/

// APP START
// --------------------------------------
app.listen(3000, function() {
  console.log("Server has started.");
});
