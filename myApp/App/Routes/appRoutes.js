'use strict'; // fichier js qui gère les routes

module.exports = function (app) {
    var todoList = require('../controller/appController.js');

    //todoListRoutes
    app.route('/tasks') // dans mon api fait référence à la route défini: http://localhost:3000/tasks
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);
    app.route('/tasks/:taskId') // dans mon api fait référence à la route défini: http://localhost:3000/tasks/1
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
};