const express = require('express');
const database = require('./Develop/db/db.json');
const fs = require('fs');
const router = express.Router();

// route to notes

router.get('/notes', (req, res) => {
    res.send(JSON.stringify(database));
    res.header("Content-Type", 'application/json');
})