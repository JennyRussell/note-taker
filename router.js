const express = require('express');
const database = require('./db/db.json');
const fs = require('fs');
const router = express.Router();


// route to notes

router.get('/api/notes', (req, res) => {
    res.send(JSON.stringify(database));
    res.header("Content-Type", 'application/json');
})

router.post('/api/notes', (req, res) => {

    const newNote = req.body;

    fs.appendFile('db.json', newNote, (err) => {
        if (err) throw err;
        console.log('New note added!');
    });
})

module.exports = router;