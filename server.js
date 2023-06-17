const express = require('express');

// Create an instance of Express
const app = express();

// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
