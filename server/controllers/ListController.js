const List = require('../models/List');

// Find List
exports.findListById = async (id) => {
  const query = List.findById(id).populate('listItems');
  return query.exec();
};

// Add list item
exports.addListItemById = async (id, listItem) => {
  const query = List.findById(id);
  query.listItems.push(listItem);
  const updatedlist = await query.save();
  return updatedList;
};

// Update list item
exports.updatedListItemById = async (id, itemId, update, done) => {
  const query = List.findById(id);
  const listItem = query.listItems.id(itemId);
  listItem.todo = update;
  listItem.done = done;
  const updatedList = await query.save();
  return updatedList
}

// Delete list item
exports.deleteListItemById = async (id, listItemId) => {
  const query = await List.findById(id);
  query.listItems.id(listItemId).remove();
  const updatedList = await query.save();
  return updatedList;
};
