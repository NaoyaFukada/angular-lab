const express = require("express"); // Import express.js
const path = require("path"); // Import the path module
const app = express(); // Create an instance of Express
const PORT = 3000;
var cors = require("cors");

// Parse URL-encoded bodies and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// This will allow requests from any origin by default
app.use(cors());

// Import and use routes
require("./routes/login").route(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

module.exports = app;
