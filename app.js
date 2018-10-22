var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var express = require('express');
var app = express();

mongoose.connect("mongodb://localhost/fractured-blog-db");

app.set('view engine', 'ejs'); // Tells express to use ejs to render our web pages server-side
app.use(express.static("public")); // Creates a static directory in 'public' that is unchanging
app.use(bodyParser.urlencoded({extended: true})); // Sets up body parser for RESTful APIs
app.use(methodOverride('_method'));

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
});

app.get('/posts/new', function(request, response) {
  response.render("posts-new");
});

/*app.get('/posts/:id', function(request, response) {

});*/

app.get('/posts/:id/edit', function(request, response) {
  Post.findOne({_id: request.params.id}, function(err, post) {
    if (err) {
      console.log("/posts/:id/edit GET failed");
    } else {
      response.render("posts-edit", {post: post});
    }
  });
});

app.put('/posts/:id/edit', function(request, response, next) {
  Post.findOneAndUpdate({"_id" : request.params.id},
      { "$set" :
        {
         "title" : request.body.post.title,
         "subheading" : request.body.post.subheading,
         "image" : request.body.post.image,
         "content" : request.body.post.content
        }
      }
    ).exec(function(err, post) {
    if(err) {
      console.log(err);
      response.status(500).send(err);
    } else {
      response.redirect("/posts");
    }
  });
});

app.delete('/posts/:id', function(request, response) {
  Post.deleteOne({_id : request.params.id}, function(err) {
    if (err) {
      response.status(500).send(err);
    } else {
      response.redirect("/posts");
    }
  });
});

app.post('/posts', function(request, response) {
  // Create post
  Post.create(request.body.post, function(err, newPost) {
    if (err) {
      response.render("posts-new");
    } else {
      response.redirect("/posts");
    }
  });
});

// APP START
// --------------------------------------
app.listen(3000, function() {
  console.log("Server has started.");
});
