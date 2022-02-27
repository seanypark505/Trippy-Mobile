const events = require('../controllers/EventController');
const express = require('express');
const router = express.Router();

router.post('/events', (req, res) => {
  // Logic for creating a new event
  const { hostId, title, location, date } = req.body;
  events
    .addEvent(hostId, title, location, date)
    .then((event) => {
      res.status(201).json(event);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ Error: 'Request Failed' });
    });
});

router.get('/events/:id', (req, res) => {
  // Logic for retrieving event by id
  const { _id } = req.params;

  events
    .findEventById(_id)
    .then((event) => {
      if (event !== null) {
        res.status(200).json(event);
      } else {
        res.status(500).json({ Error: 'Resource Not Found ' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ Error: 'Request Failed' });
    });
});

router.get('/events/share/:id', (req, res) => {
  // Logic for retrieving event by id from share link
  const { _id } = req.params;

  
})

router.put('/events/:id', (req, res) => {
  // Logic for updating an event
  const { _id, title, location, date } = req.params;

  events
    .updateEventById(_id, title, location, date)
    .then((numUpdated) => {
      if (numUpdated === 1) {
        res.status(200).json({
          _id: _id,
          title: title,
          location: location,
          date: date,
        });
      } else {
        res.status(500).json({ Error: 'Request Failed' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ Error: 'Request Failed' });
    });
});

router.delete('/events/:id', (req, res) => {
  // Logic for deleting an event
  const { _id } = req.params;

  events
    .deleteEventById(_id)
    .then((deletedCount) => {
      if (deletedCount === 1) {
        res.status(204).send();
      } else {
        res.status(500).json({ Error: 'Resource Not Found' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ Error: 'Request Failed' });
    });
});

module.exports = router;
