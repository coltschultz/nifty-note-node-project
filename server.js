const express = require('express');
const app = express();
const { notes } = require('./db/db.json');
const path = require('path');
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const createNewNote = require('./script.js');


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// HTML Requests
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname,  './public/notes.html'));
});


// API GET Requests
app.get('/api/notes', (req, res) => {
    let results = notes;

    res.json(results);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,  './public/index.html'));
});

// API DELETE Requests
app.delete("/api/notes/:id", (req, res) => {
    const { id } = req.params;
    const noteIndex = notes.findIndex(n => n.id == id);

    notes.splice(noteIndex, 1);

    return res.send();
});


// API POST Requests
app.post("/api/notes", (req, res) => {
    req.body.id = notes.length.toString();
  
      const note = createNewNote(req.body, notes);
      res.json(note);
      console.log(req.body);
  });

// Listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });