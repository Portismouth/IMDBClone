var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var app = express();

app.use(session({
    secret: 'bubblebutt',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist'));

mongoose.Promise = global.Promise;
require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./client/dist/index.html"))
});
app.listen(8000, function () {
    console.log("listening on port 8000");
});