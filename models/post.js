const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    image: String,
    title: String,
    subheading: String,
    content: String,
    created: {
        type: Date,
        default: Date.now
    },
    edited: {
        type: Date,
        default: Date.now
    },
    editedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        text: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    tags: [String]
});

module.exports = mongoose.model('Post', postSchema);
