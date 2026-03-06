const express = require('express');
const { cartAdd } = require('../middleware/validators');

const router = express.Router();

// structure { userId: number, items: [{ productId, quantity }] }
let carts = [];

// get cart for user
router.get('/:userId', (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const cart = carts.find((c) => c.userId === userId);
  if (!cart) {
    return res.json({ userId, items: [] });
  }
  res.json(cart);
});

// add to cart (or update quantity)
router.post('/', cartAdd, (req, res) => {
  const { userId, productId, quantity } = req.body;
  let cart = carts.find((c) => c.userId === userId);
  if (!cart) {
    cart = { userId, items: [] };
    carts.push(cart);
  }
  const existing = cart.items.find((i) => i.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }
  res.status(200).json(cart);
});

// remove item from cart
router.delete('/:userId/:productId', (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);
  const productId = parseInt(req.params.productId, 10);
  const cart = carts.find((c) => c.userId === userId);
  if (!cart) {
    const err = new Error('Cart not found');
    err.status = 404;
    return next(err);
  }
  cart.items = cart.items.filter((i) => i.productId !== productId);
  res.status(204).send();
});

module.exports = router;