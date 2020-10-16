"use strict"; // fichier js qui gère les routes

module.exports = function (app) {
  var Controller = require("../controller/appController.js");

  //todoListRoutes
  app
    .route("/tasks") // dans mon api fait référence à la route défini: http://localhost:3000/tasks
    .get(Controller.list_all_tasks)
    .post(Controller.create_a_task);
  app
    .route("/tasks/:taskId") // dans mon api fait référence à la route défini: http://localhost:3000/tasks/1
    .get(Controller.read_a_task)
    .put(Controller.update_a_task)
    .delete(Controller.delete_a_task);
  app
    .route("/user/create")
    .post(Controller.create_a_user);
  app
    .route("/user/login")
    .post(Controller.login_a_user);
  app
    .route("/user/update")
    .put(Controller.update_a_user);
};
