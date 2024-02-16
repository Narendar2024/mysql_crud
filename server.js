const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();

dotenv.config();

app.set('view engine', 'ejs');

const connection = require('./config/db')

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    // res.send("Server is running");
    res.redirect("/create.html");
});

app.get('/data', (req, res) => {
    connection.query("SELECT * from Students", (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.render('read.ejs', { rows });
        }
    });
})

app.post('/create', function (req, res) {

    console.log('create');
    console.log(req.body);

    const name = req.body.name;
    const email = req.body.email;
    try {
        connection.query(
            "INSERT into Students(name,email) values(?,?)",
            [name, email],
            (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    // res.send(rows);
                    res.redirect("/data");
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
})

app.listen(process.env.PORT || 4000, (error) => {
    if (error) throw error;
    console.log(`Server is running on: ${process.env.PORT}`);
});