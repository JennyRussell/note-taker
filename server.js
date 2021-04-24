const express = require('express');
const path = require('path');
const notes = require('./router');

// setting up express app
const app = express();
var PORT = process.env.PORT || 3000;

// link to assets
app.use(express.static('public'));



// set express app to handle parsing of data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// use /api
app.use('/api', notes);

// link to html pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));


// listen to this port

app.listen(3000, function() {
    console.log(`Live on port ${3000}`);
});