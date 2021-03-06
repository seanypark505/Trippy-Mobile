const lists = require('../controllers/ListController');
const express = require('express');
const router = express.Router();

// Logic for creating new list item
router.post('/:id', (req, res) => {
  const { id } = req.params;
  const newItem = req.body;

  lists
    .addListItem(id, newItem)
    .then((list) => {
      res.status(201).json(list);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ Error: 'Request Failed' });
    });
});

// Logic for retrieving user
router.get('/:id', (req, res) => {
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

// Logic for updating list items
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;

  lists.updateListItem(id, update).then((numUpdated) => {
    if (numUpdated === 1) {
      res.status(200).json({
        _id: req.params.id,
        item: req.body.item,
        done: req.body.done,
      });
    } else {
      res.status(500).json({ Error: 'Resource Not Found' });
    }
  });
});

// Logic for deleting user
router.delete('/:itemId', (req, res) => {
  const { itemId } = req.params;

  lists.deleteItemById(itemId).then((deletedCount) => {
    if (deletedCount === 1) {
      res.status(204).send();
    } else {
      res.status(500).json({ Error: 'Resource Not Found' });
    }
  });
});

module.exports = router;
