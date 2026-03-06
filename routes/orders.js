const express = require('express');
const { orderCreate } = require('../middleware/validators');

const router = express.Router();

let orders = [];
let nextId = 1;

// create order
router.post('/', orderCreate, (req, res) => {
  const { userId, items } = req.body;
  const order = { id: nextId++, userId, items, createdAt: new Date().toISOString() };
  orders.push(order);
  res.status(201).json(order);
});

// get orders for user
router.get('/:userId', (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const userOrders = orders.filter((o) => o.userId === userId);
  res.json(userOrders);
});

module.exports = router;