const events = require('../controllers/EventController');
const express = require('express');
const router = express.Router();

// Get all events route
router.get('/', (req, res) => {
  events
    .findEvents({}, '', 0)
    .then((events) => {
      res.status(201).json(events);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ Error: 'Request Failed' });
    });
});

// Create new event route
router.post('/', (req, res) => {
  const { title, location, date } = req.body;
  events
    .addEvent(title, location, date)
    .then((event) => {
      res.status(201).json(event);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ Error: 'Request Failed' });
    });
});

// Get event by ID route
router.get('/:id', (req, res) => {
  const { id } = req.params;

  events
    .findEventById(id)
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

// Route to get static read only version of event
router.get('/share/:id', (req, res) => {
  const { id } = req.params;
  events.findEventById(id).then((event) => {
    if (event !== null) {
      res.render('index.ejs', { event });
    } else {
      res.status(404).json({ Error: 'Unable to load resource' });
    }
  });
});

// Route for updating event
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;

  events.updateEventById(id, update).then((numUpdated) => {
    if (numUpdated === 1) {
      res.status(200).json({
        _id: id,
        title: update.title,
        location: update.location,
        date: update.date,
      });
    } else {
      res.status(500).json({ Error: 'Request Failed' });
    }
  });
});

// Route for deleting an event
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  events
    .deleteEventById(id)
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
