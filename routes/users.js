const express = require('express');
const { userCreate } = require('../middleware/validators');

const router = express.Router();

let users = [];
let nextId = 1;

router.get('/', (req, res) => {
  // for demonstration purposes, we won't return passwords
  res.json(users.map((u) => ({ id: u.id, username: u.username, email: u.email })));
});

router.post('/', userCreate, (req, res) => {
  const { username, email, password } = req.body;
  const user = { id: nextId++, username, email, password };
  users.push(user);
  res.status(201).json({ id: user.id, username, email });
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === id);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    return next(err);
  }
  res.json({ id: user.id, username: user.username, email: user.email });
});

module.exports = router;
