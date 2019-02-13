const express = require('express');
let app = express();
const PORT = 5000;
let bodyParser = require('body-parser');
const pool = require('./modules/pool');

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/restaurants', (req, res) => {
    pool.query('SELECT * FROM "restaurants";')
        .then((results) => {
            console.log(results.rows);
            res.send(results.rows);
        }).catch((error) => {
            console.log('error with SQL select for restaurants', error);
            res.sendStatus(500);
        });
})

app.post('/restaurants', (req, res) => {
    console.log('/restaurants POST route was hit');
    pool.query(`INSERT INTO "restaurants" ("restaurant_name", "restaurant_type")
    VALUES ($1, $2);`, [req.body.restaurantName, req.body.restaurantType])
        .then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error with restaurants insert', error);
            res.sendStatus(500);
        });
});


app.listen(PORT, () => {
    console.log('listening on port', PORT)
});


