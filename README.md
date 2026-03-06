# Backend API Example

This project provides a simple Express-based backend with REST APIs for products, users, cart, and orders. It includes:

- Data validation using `express-validator`.
- Middleware for logging and error handling.
- Simple in-memory storage for demonstration.

## Available endpoints

- **/products** — CRUD operations for product data.
- **/users** — Create and list users.
- **/cart** — Add items, view, and remove from a user's cart.
- **/orders** — Create orders and fetch by user.

## Install & Run

```bash
npm install
npm run dev   # uses nodemon
```
