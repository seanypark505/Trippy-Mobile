const Event = require('../models/Event');

// Create a new event
exports.addEvent = async (hostId, title, location, date) => {
  const eventInfo = {
    host: hostId,
    title: title,
    location: location,
    date: date,
    toDo: [],
    posts: [],
  };

  // Create new event
  const newEvent = Event.create(eventInfo);

  return newEvent;
};

// Find all events
exports.findEvents = async (filter, projection, limit) => {
  const query = Event.find(filter).select(projection).limit(limit);
  return query.exec();
};

// Find event by Id
exports.findEventById = async (id) => {
  const query = Event.findById(id);
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
  const result = await Event.deleteOne({ _id: id });
  return result.deletedCount;
};
