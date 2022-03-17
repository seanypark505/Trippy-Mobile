const List = require('../models/List');
const Event = require('../models/Event');

// Find List
exports.findListById = async (id) => {
  const event = await Event.findOne({ _id: id });
  const listIDs = event.list;
  const list = await List.find({
    _id: { $in: listIDs },
  });
  return list;
};

// Add list item
exports.addListItem = async (eventId, listItem) => {
  console.log(listItem);
  const item = List.create(listItem);
  const event = await Event.findOne({ _id: eventId });
  event.list.push(item._id);
  event.save();
  console.log(item);
  return item;
};

// Update list item
exports.updateListItem = async (itemId, update) => {
  const result = await List.updateOne({ _id: itemId }, update, {
    omitUndefined: true,
  });

  if (result.modifiedCount === 0) {
    throw 'Not Found';
  } else {
    return result.modifiedCount;
  }
};

// Delete list item
exports.deleteItemById = async (itemId) => {
  const result = await List.deleteOne({ _id: itemId });
  return result.deletedCount;
};
