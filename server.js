// heroku  https://git.heroku.com/boiling-everglades-47466.git
// https://boiling-everglades-47466.herokuapp.com/

// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");


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

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});


var manipulateNotes = function () {
    let DBJSON = [];

    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        else if (!data) {
            console.log("db.json file is empty");
            // Note data is returned as a string, not a json object
            data = "[]";
        }

        DBJSON = JSON.parse(data);
        return DBJSON// should be an array of JSON objects
    });


    app.get("/api/notes", function (req, res) {
        console.log(DBJSON)
        console.log("sending: " + DBJSON);
        return res.json(DBJSON);

    });

    app.post("/api/notes", function (req, res) {
        let newNote = req.body;
        // Give each entry a unique ID, that will continue to be unique after entries are deleted.
        newNote.id = DBJSON.length + 1;
        DBJSON.forEach(e => {
            if (newNote.id <= e.id) {
                newNote.id = e.id + 1;
            }
        });

        DBJSON.push(newNote);
        DBStr = JSON.stringify(DBJSON); // restringifies the database so it can be stored
        console.log(DBStr);

        fs.writeFile("./db/db.json", DBStr, function (err) {
            if (err) {
                return console.log(err);
            }
        });
        return res.json(newNote);

    });

    app.delete("/api/notes/:id", function (req, res) {
        let deleteID = req.params.id;
        // let DBJSONx = [];
        console.log("id: " + deleteID);
        console.log("in delete json: " + DBJSON);


        // this forEach loop has parameters element and index. It searches on element, and deletes on index.
        DBJSON.forEach((e, i) => {
            console.log(e + "id: " + e.id);
            if (e.id == deleteID) {
                console.log(e.id + " vs " + deleteID);
                DBJSON.splice(i, 1);

                DBStr = JSON.stringify(DBJSON);
                console.log(DBStr);
                fs.writeFile("./db/db.json", DBStr, function (err) {
                    console.log("file written");
                    if (err) {
                        return console.log(err);
                    }
                });
                return res.json(DBJSON);
            }
        });



        // return res.json(DBJSON);

    });

}





// Starts the server to begin listening
// =============================================================

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

manipulateNotes();