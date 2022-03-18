const Event = require('../models/Event');
const Post = require('../models/Post');

// Find List
exports.findPostById = async (id) => {
  // Find the event
  const event = await Event.findOne({ _id: id });
  const postIDs = event.posts;
  // Find all the posts in the subdocument array
  const posts = await Post.find({
    _id: { $in: postIDs },
  });
  return posts;
};

// Add list item
exports.addPostItem = async (eventId, postItem) => {
  // Create post
  const item = await Post.create(postItem);
  // Find event and add post to the event's post document array
  const event = await Event.findOne({ _id: eventId });
  event.posts.push(item._id);
  event.save();
  return item;
};

// Update list item
exports.updatePostItem = async (itemId, update) => {
  const result = await Post.updateOne({ _id: itemId }, update, {
    omitUndefined: true,
  });

  if (result.modifiedCount === 0) {
    throw 'Not Found';
  } else {
    return result.modifiedCount;
  }
};

// Delete list item
exports.deletePostById = async (itemId) => {
  const result = await Post.deleteOne({ _id: itemId });
  return result.deletedCount;
};
