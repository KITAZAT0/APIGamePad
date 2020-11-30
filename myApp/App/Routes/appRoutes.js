"use strict"; // fichier js qui gère les routes

module.exports = function (app) {
  var Controller = require("../controller/appController.js");

  //ControllerRoutes
  app
    .route("/user/create") // dans mon api fait référence à la route défini: http://localhost:3000/user/create
    .post(Controller.create_a_user);
  app
    .route("/user/login")
    .post(Controller.login_a_user);
  app
    .route("/user/update")
    .put(Controller.update_a_user);
};
