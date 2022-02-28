const mongoose = require('mongoose');
const { Schema } = mongoose;

const listSchema = new Schema({
  listItems: [{ todo: String, done: Boolean }],
});

const List = mongoose.model('List', listSchema);

module.exports = List;
