const Event = require('../models/Event');
const List = require('../models/List');

// Create a new event
exports.addEvent = async (hostId, title, location, date) => {
  const listItems = {
    listItems: [
      { todo: 'This is a To Do List', done: false },
      { todo: 'You can mark items complete', done: true },
      { todo: 'Click on the plug sign to add more items', done: false },
      { todo: 'Click on the - (minus) icon to delete', boolean: false },
    ],
  };

  const eventList = await List.create(listItems);

  const eventInfo = {
    host: hostId,
    title: title,
    location: location,
    date: date,
    list: eventList,
  };

  // Create new event
  let newEvent = await Event.create(eventInfo, function (err, event) {
    if (err) {
      console.error(err);
    } else {
      const eventId = event._id;
      const newUrl = `http://localhost:3000/events/share/${eventId}`;
      const update = { url: newUrl };
      newEvent = Event.findOneAndUpdate({ _id: eventId }, update, {
        new: true,
      });
      return newEvent.exec();
    }
  });
};

// Find all events
// exports.findEvents = async (filter, projection, limit) => {
//   const query = await Event.find(filter).select(projection).limit(limit);
//   return query.exec();
// };

// Find event by Id
exports.findEventById = async (id) => {
  const query = await Event.findById(id)
    .populate('host')
    .populate('list')
    .populate('posts');
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
