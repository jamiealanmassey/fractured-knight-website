const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
      title: String,
      subheading: String,
      image: {type: String, default: 'img/image-default.jpg'},
      content: String,
      created: {type: Date, default: Date.now},
      author: String,
      tags: [String]
});

mongoose.model('Post', postSchema);
