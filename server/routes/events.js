const events = require('../controllers/EventController');
const express = require('express');
const router = express.Router();

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

router.post('/', (req, res) => {
  // Logic for creating a new event
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

router.get('/:id', (req, res) => {
  // Logic for retrieving event by id
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

router.get('/share/:id', (req, res) => {
  // Logic for retrieving event by id from share link
  // const event = events.findEventById(id);
  const { id } = req.params;

  res.render('index.ejs', { id });
});

router.put('/:id', (req, res) => {
  // Logic for updating an event
  const { id } = req.params;
  const { title, location, date } = req.body;

  events
    .updateEventById(id, title, location, date)
    .then((numUpdated) => {
      if (numUpdated === 1) {
        res.status(200).json({
          _id: id,
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

router.delete('/:id', (req, res) => {
  // Logic for deleting an event
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
