const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
      title: String,
      subheading: String,
      image: {type: String, default: 'img/image-default.jpg'},
      content: String,
      created: {type: Date, default: Date.now},
      edited: {type: Date, default: Date.now},
      editedBy: {type: String, default: ""}, // TODO: Make this an ID linked to a user
      author: String, // TODO: Make this an ID linked to a user
      tags: [String]
});

module.exports = mongoose.model('Post', postSchema);
