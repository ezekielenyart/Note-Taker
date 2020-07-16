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
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(express.json());

// =================== ROUTES =====================

app.get("/api/notes", async function (req, res) {

    try {
        let data = await readFileAsync("./db/db.json", 'utf8')
        data = data.length ? JSON.parse(data) : [];
        res.json(data)
    } catch (error) {
        res.sendStatus(500)
    }

    // readFileAsync("./db/db.json", 'utf8')
    //     .then(data => {
    //         data = data.length ? JSON.parse(data) : [];

    //         res.json(data)
    //     })
    //     .catch(() => res.sendStatus(500))

    // readFileAsync("./db/db.json", 'utf8', function (err, data) {
    //     if (err) return res.sendStatus(500)


    //     data = data.length ? JSON.parse(data) : [];

    //     res.json(data)
    // })
})

app.post("/api/notes", async function (req, res) {
    try {
        let data = await readFileAsync("./db/db.json", 'utf8')

        data = data.length ? JSON.parse(data) : [];
        req.body.id = data[data.length - 1].id + 1;
        data.push(req.body);
        data = JSON.stringify(data);

        await writeFileAsync(path.join(__dirname, "db/db.json"), data)

        res.json(data)
    } catch (error) {
        res.sendStatus(500)
    }

    // readFileAsync("./db/db.json", 'utf8', function (err, data) {
    //     if (err) return res.sendStatus(500)

    //     data = data.length ? JSON.parse(data) : [];

    //     // PROPOSITION: each new id is one greater than last elements id
    //     // req.body.id = data.length;
    //     req.body.id = data[data.length - 1].id + 1

    //     data.push(req.body)

    //     // TODO
    //     // for (let i = 0; i < data.length; i++) {
    //     //     data[i].id = i;
    //     // }

    //     data = JSON.stringify(data);

    //     fs.writeFile(path.join(__dirname, "db/db.json"), data, function (err) {
    //         if (err) throw err;

    //         // console.log(data, "data read")
    //         res.json(data)
    //     })
    // })
})


app.delete("/api/notes/:id", async function (req, res) {
    try {
        let id = parseInt(req.params.id)
        let data = await readFileAsync("./db/db.json", 'utf8')

        data = data.length ? JSON.parse(data) : []
        data = data.filter(note => note.id !== id)
        data = JSON.stringify(data)

        await writeFileAsync(path.join(__dirname, "db/db.json"), data)

        res.json(data)
    } catch (error) {
        res.sendStatus(500)
    }
    // readFileAsync("./db/db.json", 'utf8', function (err, data) {
    //     if (err) return res.sendStatus(500)

    //     data = data.length ? JSON.parse(data) : []

    //     // You manipulate it
    //     // data.splice(id, 1)

    //     // TODO
    //     // for (let i = 0; i < data.length; i++) {
    //     //     data[i].id = i;
    //     // }

    //     data = data.filter(note => note.id !== id)

    //     data = JSON.stringify(data)

    //     fs.writeFile("./db/db.json", data, function (err) {
    //         if (err) return res.sendStatus(500);
    //         // data = JSON.parse(data);
    //         // res.sendStatus(200);
    //         // console.log("data return", data)
    //         // data = JSON.stringify
    //         res.json(data)
    //         //     })
    //         //     res.sendStatus(200)
    //     })
    // })
})


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