const List = require('../models/List');
const Event = require('../models/Event');

// Find List by ID with posts populates
exports.findListById = async (id) => {
  // Find the event
  const event = await Event.findOne({ _id: id });
  const listIDs = event.list;

  // Find all the list items in the subdocument array
  const list = await List.find({
    _id: { $in: listIDs },
  });
  return list;
};

// Add list item to event
exports.addListItem = async (eventId, listItem) => {
  // Create new list item
  const item = await List.create(listItem);
  // Find the event
  const event = await Event.findOne({ _id: eventId });
  // Add list item to event's list subdocument array
  event.list.push(item._id);
  event.save();
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
