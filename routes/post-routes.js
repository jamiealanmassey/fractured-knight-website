const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const express = require('express');
const router = express.Router();

function retrieveRequest(request, response) {
    Post.find({}, function(error, posts) {
        if (error) {
            console.log("error");
        } else {
            response.render("posts", {posts: posts});
        }
    });
}

function retrieveEditRequest(request, response) {
    Post.findOne({_id: request.params.id}, function(error, post) {
        if (error) {
            console.log("/posts/:id/edit GET failed");
        } else {
            response.render("posts-edit", {post: post});
        }
    });
}

function updateEditRequest(request, response, next) {
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

function deleteRequest(request, response) {
    Post.deleteOne({_id : request.params.id}, function(error) {
        if (error) {
            response.status(500).send(error);
        } else {
            response.redirect("/posts");
        }
    });
}

function postRequest(request, response) {
    Post.create(request.body.post, function(error, post) {
        if (error) {
            response.render('posts-new');
        } else {
            response.redirect('/posts');
        }
    })
}

function isAdminUser(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }

    response.redirect('/login');
}

router.get('/posts/new', isAdminUser, function(request, response) {
  response.render("posts-new");
});

router.delete('/posts/:id', isAdminUser, deleteRequest);
router.get('/posts', retrieveRequest);
router.get('/posts/:id/edit', isAdminUser, retrieveEditRequest);
router.put('/posts/:id/edit', isAdminUser, updateEditRequest);
router.post('/posts', isAdminUser, postRequest);

module.exports = router;
