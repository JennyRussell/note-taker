const fs = require('fs').promises;
class Note {
    read() {
        return fs.readFile("db/db.json", 'utf8')
    }

    allNotes() {
        return this.read().then((notes) => {
            const parsedNotes = JSON.parse(notes).map(note => note)
            return parsedNotes;
        })
    }
}

module.exports = new Note()