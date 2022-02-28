const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  host: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  list: [{ type: Schema.Types.ObjectId, ref: 'List' }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  url: String,
});

const Post = mongoose.model('Event', postSchema);

module.exports = Post;
