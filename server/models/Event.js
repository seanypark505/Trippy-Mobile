import mongoose, { Schema } from 'mongoose';

const eventSchema = new Schema({
  host: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  toDo: [{ type: Schema.Types.ObjectId, ref: 'List' }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

const Event = mongoose.model('Event', eventSchema);

export { Event };
