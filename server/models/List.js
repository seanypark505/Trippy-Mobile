import mongoose, { Schema } from 'mongoose';

const listSchema = new Schema({
  listItems: [{ todo: String, done: boolean }],
});

const List = mongoose.model('List', listSchema);

module.exports = List;
