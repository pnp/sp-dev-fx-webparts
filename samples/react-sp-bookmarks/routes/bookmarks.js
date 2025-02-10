const express = require('express');
const router = express.Router();

// Mock data for bookmarks
let bookmarks = [
    { id: '1', title: 'Google', url: 'https://google.com' },
    { id: '2', title: 'Facebook', url: 'https://facebook.com' }
];

// Get all bookmarks
router.get('/', (req, res) => res.json(bookmarks));

// Add a new bookmark
router.post('/', (req, res) => {
    const newBookmark = req.body;
    bookmarks.push(newBookmark);
    res.status(201).json(newBookmark);
});

module.exports = router;