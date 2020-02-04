// heroku  https://git.heroku.com/boiling-everglades-47466.git
// https://boiling-everglades-47466.herokuapp.com/

// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
var db = require("./db/db.json");

// Sets up the Express App
// =============================================================

var app = express();
app.use(express.static(path.join(__dirname, '/public')));
const PORT = process.env.PORT || 5001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/db')));

// Routes
// =============================================================

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});


app.get("/api/notes", function (req, res) {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        DBJSON = JSON.parse(data); // should be an array of JSON objects

    });
    console.log("sending: " + DBJSON);
    return res.json(DBJSON);
    // res.sendFile(DBJSON);
});




    // Get note json from webpage
    app.post("/api/notes", function (req, res) {
        var newNote = req.body;
        newNote.routename = newNote.title.replace(/\s+/g, "").toLowerCase();

        // Get db file
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            DBJSON = JSON.parse(data); // should be an array of JSON objects
            console.log("DBJSON: " + JSON.stringify(DBJSON));
            // append newNote to file

            DBJSON.push(newNote);
            DBStr = JSON.stringify(DBJSON); // restringifies the database so it can be stored
            console.log(DBStr);

            fs.writeFile("./db/db.json", DBStr, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        });

    });



    // Starts the server to begin listening
    // =============================================================

    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });