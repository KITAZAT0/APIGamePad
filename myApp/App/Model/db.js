'user strict'; //fichier js qui accede à la bdd

var mysql = require('mysql');

var con = mysql.createConnection({ 
    host: "localhost", 
    user: "root", 
    password: "", 
    database: 'gamepad' }); // information de connexion instauré dans phpmyadmin

con.connect(function (err) {
    if (err) throw err;
    console.log('database connected'); //affiche dans le console log si la connexion à la bdd est ok
});

module.exports = con;