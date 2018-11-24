const mongoose = require('mongoose');
const identify = require('./identify');
const Post = mongoose.model('Post');
const express = require('express');
const router = express.Router();

function retrieveRequest(request, response) {
    Post.find({})
        .populate('author')
        .populate('editedBy')
        .exec(function(error, posts) {
            if (error) {
                console.log(JSON.stringify(posts, null, '\t'));
            }

            response.render('posts/all', { posts: posts });
        });
}

function retrieveSingleRequest(request, response) {
    Post.findOne({_id: request.params.id})
        .populate('author')
        .populate('editedBy')
        .populate('comments.postedBy')
        .exec(function(error, post) {
            if (error) {
                console.log(JSON.stringify(post, null, '\t'));
            }

            response.render('posts/post', { post: post });
        });
}

function retrieveEditRequest(request, response) {
    Post.findOne({_id: request.params.id}, function(error, post) {
        if (error) {
            console.log("/posts/:id/edit GET failed");
        } else {
            response.render("posts/edit", {post: post});
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
    Post.create({
        image: request.body.post.image,
        title: request.body.post.title,
        subheading: request.body.post.subheading,
        content: request.body.post.content,
        editedBy: request.user._id,
        author: request.user._id
    }, function(error, post) {
        if (error) {
            response.render('posts/new');
        } else {
            response.redirect('/posts');
        }
    });
}

router.get('/posts/new', identify.isUserAdmin, function(request, response) {
  response.render("posts/new");
});

router.get('/posts', retrieveRequest);
router.post('/posts', identify.isUserAdmin, postRequest);
router.delete('/posts/:id', identify.isUserAdmin, deleteRequest);
router.get('/posts/:id', retrieveSingleRequest);
router.get('/posts/:id/edit', identify.isUserAdmin, retrieveEditRequest);
router.put('/posts/:id/edit', identify.isUserAdmin, updateEditRequest);

module.exports = router;
