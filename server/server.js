const express = require('express');
const app = express();
const port = 3000;

// Define your endpoint
app.get('/api/hotels', (req, res) => {
    // Your logic here
    res.json({ message: 'This is a backend endpoint' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
