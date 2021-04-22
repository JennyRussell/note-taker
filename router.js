const express = require('express');
const database = require('./db/db.json');
const note = require('./db/note');
// const fs = require('fs').promises;
const router = express.Router();


// route to notes
router.get('/notes', function(req, res) {
    return note.allNotes().then(data => res.json(data))
        // console.log(res);

});

router.post('/notes', (req, res) => {

    const newNote = req.body;

    fs.appendFile('db.json', newNote, (err) => {
        if (err) throw err;
        console.log('New note added!');
    });
})

module.exports = router;