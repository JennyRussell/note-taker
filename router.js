const express = require('express');
const database = require('./db/db.json');
const note = require('./db/note');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();
// const uuid = require('uuid');
const { v4: uuidv4 } = require("uuid");


// route to get notes for file
router.get('/notes', function(req, res) {
    return note.allNotes().then(data => res.json(data))
        // console.log(res);

});

// route to post new notes
router.post('/notes', (req, res) => {
    console.log(req.body);
    const title = req.body.title;
    const text = req.body.text;

    const newNote = { title, text, id: uuidv4() };

    let parsedNotes;

    fs.readFile('db/db.json', "utf8").then(
        (notes) => {
            parsedNotes = [].concat(JSON.parse(notes))
            let updatedNotes = [...parsedNotes, newNote];
            fs.writeFile('db/db.json', JSON.stringify(updatedNotes)).then(
                (data) => {
                    console.log("Note Added");
                    res.send("Note Added");
                }
            )
        }
    );
});


//route to delete notes
router.delete('/notes/:id', (req, res) => {
    let id = req.params.id
    note.allNotes().then((notes) => {
        for (const note of notes) {
            if (note.id === id) {
                const index = notes.indexOf(note)
                notes.splice(index, 1)
                let getAllNotes = JSON.stringify(notes)
                fs.writeFile('./db/db.json', getAllNotes, (err) =>
                    err ? console.log(err) : console.log('Note Added'));


            }

        }

    })
    note.allNotes().then((notes) => res.json(notes));
});




module.exports = router;