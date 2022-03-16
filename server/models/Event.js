const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  list: [{ type: Schema.Types.ObjectId, ref: 'List' }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  url: String,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
