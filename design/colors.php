
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// POST endpoint for /color
app.post('/color', (req, res) => {
  const color = req.body.color;
  console.log(`Received color: ${color}`);
  
  // Process the color as needed (e.g., store in a database, perform calculations)

  // Send back a response (optional)
  res.json({ message: 'Color received successfully', color });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
