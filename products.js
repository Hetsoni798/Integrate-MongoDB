const express = require('express');
const { productCreate } = require('../middleware/validators');

const router = express.Router();

// simple in-memory store
let products = [];
let nextId = 1;

// list products
router.get('/', (req, res) => {
  res.json(products);
});

// create product
router.post('/', productCreate, (req, res) => {
  const { name, price, description } = req.body;
  const product = { id: nextId++, name, price, description };
  products.push(product);
  res.status(201).json(product);
});

// get single product
router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const prod = products.find((p) => p.id === id);
  if (!prod) {
    const err = new Error('Product not found');
    err.status = 404;
    return next(err);
  }
  res.json(prod);
});

// update product
router.put('/:id', productCreate, (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    const err = new Error('Product not found');
    err.status = 404;
    return next(err);
  }
  const { name, price, description } = req.body;
  products[index] = { id, name, price, description };
  res.json(products[index]);
});

// delete
router.delete('/:id', (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    const err = new Error('Product not found');
    err.status = 404;
    return next(err);
  }
  products.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
