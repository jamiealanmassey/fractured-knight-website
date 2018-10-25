const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const express = require('express');
const router = express.Router();

var retrieveRequest = function(request, response) {
    Post.find({}, function(error, posts) {
        if (error) {
            console.log("error");
        } else {
            response.render("posts", {posts: posts});
        }
    });
}

var retrieveEditRequest = function(request, response) {
    Post.findOne({_id: request.params.id}, function(error, post) {
        if (error) {
            console.log("/posts/:id/edit GET failed");
        } else {
            response.render("posts-edit", {post: post});
        }
    });
}

var updateEditRequest = function(request, response, next) {
    Post.findOneAndUpdate({"_id" : request.params.id},
        { "$set" :
            {
                "title" : request.body.post.title,
                "subheading" : request.body.post.subheading,
                "image" : request.body.post.image,
                "content" : request.body.post.content
            }
        }
    ).exec(function(error, post) {
        if(error) {
            response.status(500).send(error);
        } else {
            response.redirect("/posts");
        }
    });
}

var deleteRequest = function(request, response) {
    Post.deleteOne({_id : request.params.id}, function(error) {
        if (error) {
            response.status(500).send(error);
        } else {
            response.redirect("/posts");
        }
    });
}

var postRequest = function(request, response) {
    Post.create(request.body.post, function(error, post) {
        if (error) {
            response.render('posts-new');
        } else {
            response.redirect('/posts');
        }
    })
}

router.get('/posts/new', function(request, response) {
  response.render("posts-new");
});

router.delete('/posts/:id', deleteRequest);
router.get('/posts', retrieveRequest);
router.get('/posts/:id/edit', retrieveEditRequest);
router.put('/posts/:id/edit', updateEditRequest);
router.post('/posts', postRequest);

module.exports = router;
