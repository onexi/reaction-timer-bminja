const express = require('express');
//const bodyParser = require('body-parser');
//const escape = require('escape-html');
const app = express();
const PORT = process.env.PORT || 3030;
const path = require('path');

// Serve the static files from the public directory
app.use(express.static('public'));

// Middleware to parse JSON and URL-encoded data
//app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory storage for reaction times
let results = [];

// Serve the HTML file on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to submit reaction time
app.post('/submit', (req, res) => {
    const { name, time } = req.body;
    results.push({ name, time });
    results.sort((a, b) => a.time - b.time); // Sort by reaction time

    // Keep only the top 10 results
    if (results.length > 10) {
        results = results.slice(0, 10);
    }

    res.json(results);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});