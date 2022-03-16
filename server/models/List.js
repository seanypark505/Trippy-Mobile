const mongoose = require('mongoose');
const { Schema } = mongoose;

const listSchema = new Schema({
  item: String,
  done: Boolean,
});

const List = mongoose.model('List', listSchema);

module.exports = List;
