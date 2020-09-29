/* var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
app.listen(port);
console.log('todo list RESTful API server started on: ' + port); */

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
port = process.env.PORT || 3000;

app.listen(port);

console.log('API server started on:' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/routes/approutes');//importing route
routes(app);//register the route