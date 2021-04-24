const express = require('express');
const database = require('./db/db.json');
const note = require('./db/note');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();
// const uuid = require('uuid');
const { v4: uuidv4 } = require("uuid");


// route to notes
router.get('/notes', function(req, res) {
    return note.allNotes().then(data => res.json(data))
        // console.log(res);

});

router.post('/notes', (req, res) => {
    console.log(req.body);
    const title = req.body.title;
    const text = req.body.text;

    const newNote = { title, text, id: uuidv4() };

    var parsedNotes;

    fs.readFile('db/db.json', "utf8").then(
        (notes) => {
            parsedNotes = [].concat(JSON.parse(notes))
            var updatedNotes = [...parsedNotes, newNote];
            fs.writeFile('db/db.json', JSON.stringify(updatedNotes)).then(
                (data) => {
                    console.log("Added");
                    res.send("Added");
                }
            )
        }
    );
});







module.exports = router;