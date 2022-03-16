const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  label: String,
  content: String,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
