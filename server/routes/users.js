const users = require('../controllers/UserController');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  // Logic for creating new user
  const { email, password, fName, lName } = req.body;

  users
    .addUser(email, password, fName, lName)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ Error: 'Request Failed' });
    });
});

router.get('/:id', (req, res) => {
  // Logic for retrieving user
  const { id } = req.params;

  users
    .findUserById(id)
    .then((user) => {
      if (user !== null) {
        res.status(200).json(user);
      } else {
        res.status(500).json({ Error: 'Resource Not Found' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ Error: 'Request Failed' });
    });
});

router.put('/:id', (req, res) => {
  // Logic for updating user
  const { id } = req.params;
  const { email, password, fName, lName, events } = req.body;

  events
    .updateUserById(id, email, password, fName, lName, events)
    .then((numUpdated) => {
      if (numUpdated === 1) {
        res.status(200).json({
          Success: 'User Updated',
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
  // Logic for deleting user
  const { id } = req.params;

  events
    .deleteUserById(id)
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
