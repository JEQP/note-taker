// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

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


// Starts the server to begin listening
// =============================================================

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });