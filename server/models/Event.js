import mongoose, { Schema } from 'mongoose';

const eventSchema = new Schema({
  host: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  list: { type: Schema.Types.ObjectId, ref: 'List' },
  posts: [{ user: String, content: String}],
  url: String,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
