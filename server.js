/**
 * server.js — Entry Point
 * Starts the Express server on a given port.
 */

const app  = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
