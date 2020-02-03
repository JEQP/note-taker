// heroku  https://git.heroku.com/boiling-everglades-47466.git
// https://boiling-everglades-47466.herokuapp.com/

// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
var db = require("/db/db.json");

// Sets up the Express App
// =============================================================

var app = express();
const PORT = process.env.PORT || 5001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.post("/api/notes", function (req, res){
    var newNote = req.body;
    newNote.routename = newNote.title.replace(/\s+/g, "").toLowerCase();
    console.log(newNote.title);
    console.log(newNote.text);
    db.push(newNote);
    res.json(newNote);

    
})

// Starts the server to begin listening
// =============================================================

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });