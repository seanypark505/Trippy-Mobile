const lists = require('../controllers/ListController');
const express = require('express');
const router = express.Router();

router.post('/lists/:id', (req, res) => {
  // Logic for creating new list item
  const { id } = req.params;
  const { newItem } = req.body;

  lists
    .addListItemById(id, newItem)
    .then((list) => {
      res.status(201).json(list);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ Error: 'Request Failed' });
    });
});

router.get('/lists/:id', (req, res) => {
  // Logic for retrieving user
  const { id } = req.params;

  lists
    .findListById(id)
    .then((list) => {
      if (list !== null) {
        res.status(200).json(list);
      } else {
        res.status(500).json({ Error: 'Resource Not Found' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ Error: 'Request Failed' });
    });
});

router.put('/lists/:id', (req, res) => {
  // Logic for updating list items
  const { id } = req.params;
  const { listItem } = req.body;
  const itemId = listItem._id;
  const update = listItem.todo;
  const done = listItem.done;

  lists
    .updateListItemById(id, itemId, update, done)
    .then((list) => {
      if (list !== null) {
        res.status(200).json(list);
      } else {
        res.status(500).json({ Error: 'Resource Not Found' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ Error: 'Request Failed' });
    });
});

router.delete('/lists/:listId/item/:itemId', (req, res) => {
  // Logic for deleting user
  const { listId, itemId } = req.params;

  events
    .deleteUserById(listId, itemId)
    .then((list) => {
      if (list !== null) {
        res.status(200).json(list);
      } else {
        res.status(500).json({ Error: 'Resource Not Found' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ Error: 'Request Failed' });
    });
});

module.exports = router;
