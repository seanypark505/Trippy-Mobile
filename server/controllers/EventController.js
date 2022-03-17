const Event = require('../models/Event');
const List = require('../models/List');

// Create a new event
exports.addEvent = async (title, location, date) => {
  const eventInfo = {
    title: title,
    location: location,
    date: date,
  };

  // Create new event
  const newEvent = await Event.create(eventInfo);

  const eventId = newEvent._id;
  const newUrl = `http://localhost:3000/events/share/${eventId}`;
  newEvent.url = newUrl;

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
  const query = await Event.findById(id).populate('list').populate('posts');
  return query.exec();
};

// Update event by Id
exports.updateEventById = async (id, title, location, date) => {
  const result = await Event.updateOne(
    { _id: id },
    {
      title: title,
      location: location,
      date: date,
    },
    { omitUndefined: true }
  );

  if (result.n === 0) {
    throw 'Event does not exist';
  } else {
    return result.nModified;
  }
};

exports.deleteEventById = async (id) => {
  const event = await Event.findOne({ _id: id });
  const listIDs = event.list;
  await List.deleteMany({
    _id: { $in: listIDs },
  });
  const result = await Event.deleteOne({ _id: id });
  return result.deletedCount;
};
