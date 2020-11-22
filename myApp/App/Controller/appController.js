"use strict"; //fonctions qui serviront à nos routes
// les fonctions ici utilsent les methodes task de appModel.js


var User = require("../model/appModel.js");

exports.create_a_user = function (req, res) {
  //console.log(req.body);
  var new_user = new User(req.body);

  //handlesnullerror
  if (!new_user.email || !new_user.password) {
    res
      .password(400)
      .send({ error: true, message: "Please provide email/password" });
  } else {
    User.createUser(new_user, function (err, user) {
      if (err) res.send(err);
      res.json(user);
    });
  }
};

exports.login_a_user = function (req, res) {
  // req = request et res = response
  //console.log(req.params.userId);
  var login_user = new User(req.body);

  if (!login_user.email || !login_user.password) {
    res
      .password(400)
      .send({ error: true, message: "Please provide email/password" });
  } else {
    User.loginUser(login_user, function (err, user) {
      if (err) res.send(err);
      res.json(user);
    });
  }
};

exports.update_a_user = function (req, res) {


  User.updateUser(new User(req.body), function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};
