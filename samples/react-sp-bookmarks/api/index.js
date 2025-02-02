const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json()); // For parsing application/json
app.use(cors()); // For handling CORS

// Import and use routes
const bookmarksRoute = require('./routes/bookmarks');
app.use('/api/bookmarks', bookmarksRoute);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Bookmark API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});