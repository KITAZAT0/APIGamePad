/* var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
app.listen(port);
console.log('todo list RESTful API server started on: ' + port); */



const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
    const cors = require("cors");
port = process.env.PORT || 3000; //port qui sera utilisé pour l'acces à l'api


app.listen(port);

console.log('RESTful API server started on:' + port); // affichage dans le console log du port

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const jwt = require('express-jwt');

const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://apigamepad.eu.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: 'https://GamePad-API',
    issuer: `https://apigamepad.eu.auth0.com/`,
    algorithms: ['RS256']
});

var routes = require('./App/Routes/appRoutes.js');//importing route
routes(app.use(checkJwt));//register the route