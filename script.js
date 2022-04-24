
const path = require('path');
const fs = require("fs");

// Create a new Note 

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify({notes: notesArray}, null, 2)
    );
    return note;
  }

  module.exports = createNewNote;