// =============================================================
var express = require("express");
var path = require("path");
const fs = require("fs");
const { json } = require("express");

const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(express.json());

// =================== ROUTES =====================

app.get("/api/notes", function (req, res) {
    readFileAsync("./db/db.json", 'utf8', function (err, data) {
        if (err) return res.sendStatus(500)

        data = JSON.parse(data);

        res.json(data)
    })
})

app.post("/api/notes", function (req, res) {
    readFileAsync("./db/db.json", 'utf8', function (err, data) {
        // if (err) return res.sendStatus(500)

        data = JSON.parse(data);

        // TODO
        for (let i = 0; i < data.length; i++) {
            (data[i]).id = i;
            
        }
        data.push(req.body)

        // data = JSON.stringify(data);

        return writeFileAsync((path.join(__dirname, "db/db.json")), JSON.stringify(data))
        .then(function () {
          res.json(data)
        })
            console.log(data, "data read")
        })
    })


app.delete("/api/notes/:id", function(req, res){
    let id = req.params.id
    readFileAsync("./db/db.json", 'utf8')
    .then(function (data) {
        // if (err) return res.sendStatus(500)    
// Parse it so JSON knows what to do
        console.log("data", data)
        data = JSON.parse(data)
        // id = parseInt(id)
        console.log('ID', id)
        
// YOu manipulate it
        // data.splice(parseInt(id), 1)
        // data.splice((id), 1)
// Push the object ot the data
            // res.json(data)
        // return writeFileAsync((path.join(__dirname, "db/db.json")), JSON.stringify(data))
        // .then(function () {
        //   res.json(data)
        // })

        return writeFileAsync("./db/db.json", data, function () {
            if (err) return res.sendStatus(500);
            // data = JSON.parse(data);
            // res.sendStatus(200);
            console.log("data return", data)
            data = JSON.stringify
            res.json(data)
    //     })
    //     res.sendStatus(200)
        })
    })})


// assign newNote a route name to be able to reference each one specifically
    // Lowercase no spaces
    // Use Title key in the objectas a starting point to make route name

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// =================== ROUTES =====================

app.listen(PORT, function () {
    console.log("App listening on PORT" + PORT);

});