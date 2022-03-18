const Event = require('../models/Event');
const List = require('../models/List');
const Post = require('../models/Post');

// Create a new event
exports.addEvent = async (title, location, date) => {
  const eventInfo = {
    title: title,
    location: location,
    date: date,
  };

  // Create new event
  const newEvent = await Event.create(eventInfo);

  // Update the url to the event used for sharing
  const eventId = newEvent._id;
  const newUrl = `http://localhost:3000/events/share/${eventId}`;
  newEvent.url = newUrl;

  // Create default list of toDo items
  const defaultList = [
    { item: 'This is a To Do List', done: false, event: eventId },
    { item: 'You can mark items complete', done: true, event: eventId },
    {
      item: 'Use the input at the bottom to add another item',
      done: false,
      event: eventId,
    },
    {
      item: 'Click on the - (minus) icon on the right to delete',
      done: false,
      event: eventId,
    },
  ];

  const newList = await List.create(defaultList);

  // Add toDo items as subdocuments to the event
  newList.forEach((item) => newEvent.list.push(item._id));
  return newEvent.save();
};

// Find all events
exports.findEvents = async (filter, projection, limit) => {
  const query = Event.find(filter).select(projection).limit(limit);
  return query.exec();
};

// Find event by Id
exports.findEventById = async (id) => {
  const query = await Event.findOne({ _id: id })
    .populate('list')
    .populate('posts');
  return query;
};

// Update event by Id
exports.updateEventById = async (id, update) => {
  const result = await Event.updateOne({ _id: id }, update, {
    omitUndefined: true,
  });

  if (result.modifiedCount === 0) {
    throw 'Event does not exist';
  } else {
    return result.modifiedCount;
  }
};


// Delete event by Id
exports.deleteEventById = async (id) => {
  const event = await Event.findOne({ _id: id });
  const listIDs = event.list;
  const postIDs = event.posts;

  // Delete all associated toDo items for the event
  await List.deleteMany({
    _id: { $in: listIDs },
  });

  // Delete all associated posts for the event
  await Post.deleteMany({
    _id: { $in: postIDs },
  });

  const result = await Event.deleteOne({ _id: id });
  return result.deletedCount;
};
