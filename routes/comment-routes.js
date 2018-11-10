const mongoose = require('mongoose');
const identify = require('./identify');
const Post = mongoose.model('Post');
const express = require('express');
const router = express.Router();

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

router.post('/posts/:id/comments', identify.isUser, createComment);

module.exports = router;
