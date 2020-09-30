/* var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
app.listen(port);
console.log('todo list RESTful API server started on: ' + port); */



const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
port = process.env.PORT || 3000; //port qui sera utilisé pour l'acces à l'api

app.listen(port);

console.log('RESTful API server started on:' + port); // affichage dans le console log du port

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./App/Routes/appRoutes.js');//importing route
routes(app);//register the route