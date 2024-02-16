const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();

dotenv.config();

app.set("view engine", "ejs");

const connection = require("./config/db.js");

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
    //res.send("Server is running");
    res.redirect("/create.html");
});


app.get("/data", (req, res) => {
    connection.query("SELECT * from studinfo", (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.render("read.ejs", { rows });
        }
    });
});

app.get('/delete-data', (req, res) => {
    const deleteQuery = 'delete from studinfo where id=?';
    connection.query(deleteQuery, [req.query.id], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/data');
        }
    });
});

app.post("/create", (req, res) => {
    console.log("create");
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    try {
        connection.query(
            "INSERT into studinfo(name,email) values(?,?)",
            [name, email],
            (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    //res.send(rows);
                    res.redirect("/data");
                }
            }
        );

    }
    catch {
        console.log(err);
    }
})


app.listen(process.env.PORT || 4000, (error) => {
    if (error) throw error;
    console.log(`server is running on : ${process.env.PORT}`)
});