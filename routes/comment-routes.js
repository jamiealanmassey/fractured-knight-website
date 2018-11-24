const mongoose = require('mongoose');
const identify = require('./identify');
const Post = mongoose.model('Post');
const express = require('express');
const router = express.Router();

function validateRemoval(request, response, next) {
    console.log("passed user id: " + request.params.id);
    Post.findOne({"_id" : request.params.id})
        .exec(function(error, post) {
            if (error) {
                response.redirect('/posts/' + request.params.id);
            } else {
                console.log("comment structure: " + post);
                console.log("comment user id: " + post.postedBy);
                console.log(post.comments.some(element => element.postedBy.equals(request.user.comment)));

                if (request.isAuthenticated() && request.user._id.equals(post.postedBy)) {
                    console.log("Request successfully deleted");
                    return next();
                }
            }
        });

    response.redirect('/posts/' + request.params._id);
}

function createComment(request, response) {
    console.log("creating comment...");
    Post.findOneAndUpdate({"_id" : request.params.id},
        { $push:
            {
                "comments":
                {
                    "text": request.body.comment.content,
                    "postedBy": request.user._id
                }
            }
        }
    ).exec(function(error, post) {
        if(error) {
            response.status(500).send(error);
        } else {
            console.log('redirecting to /posts/' + request.params.id);
            response.redirect('/posts/' + request.params.id);
        }
    });
}

function deleteComment(request, response) {
    console.log("deleting comment...");
    Post.findOneAndRemove({"comments._id" : request.params.comment})
        .exec(function(error, comment) {
            if (error) {
                response.status(500).send(error);
            } else {
                console.log('redirecting to /posts/' + request.params.id);
                response.redirect('/posts/' + request.params.id);
            }
        });
}

router.post('/posts/:id/comments', identify.isUser, createComment);
//router.delete('/posts/:id/comments/:comment', validateRemoval, deleteComment);

module.exports = router;
