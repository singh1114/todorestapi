const bodyParser = require('body-parser');
const config = require('./config/config');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(config.url, function (err, client) {
    const db = client.db('test')
    if (err) throw err;
    else console.log("successfully connected to the database");
    require('./api/routes')(app, db)
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});
