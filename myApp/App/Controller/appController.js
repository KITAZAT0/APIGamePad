'use strict'; //fonctions qui serviront à nos routes
// les fonctions ici utilsent les methodes task de appModel.js

var Task = require('../model/appModel.js');

exports.list_all_tasks = function (req, res) {
    Task.getAllTask(function (err, task) {
        console.log('controller')
        if (err) res.send(err);
        console.log('res', task); res.send(task);
    });
};

exports.create_a_task = function (req, res) {
    //console.log(req.body);
    var new_task = new Task(req.body);

    //handlesnullerror
    if (!new_task.task || !new_task.status) {
        res.status(400).send({ error: true, message: 'Please provide task/status' });
    } else {
        Task.createTask(new_task, function (err, task) {
            if (err) res.send(err);
            res.json(task);
        });
    }
};

exports.read_a_task = function (req, res) {
    Task.getTaskById(req.params.taskId, function (err, task) {
        if (err) res.send(err);
        res.json(task);
    });
};

exports.update_a_task = function (req, res) {
    Task.updateById(req.params.taskId, new Task(req.body), function (err, task) {
        if (err) res.send(err);
        res.json(task);
    });
};

exports.delete_a_task = function (req, res) {
    Task.remove(req.params.taskId, function (err, task) {
        if (err) res.send(err);
        res.json({ message: 'Task success fully deleted' });
    });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

var User = require('../model/appModel.js');

exports.create_a_user = function (req, res) {
    //console.log(req.body);
    var new_user = new User(req.body);

    //handlesnullerror
    if (!new_user.email || !new_user.password) {
        res.password(400).send({ error: true, message: 'Please provide email/password' });
    } else {
        User.createUser(new_user, function (err, user) {
            if (err) res.send(err);
            res.json(user);
        });
    }
};

exports.login_a_user = function (req, res) {
  console.log(req.params.userId);
  User.getloginUser(req.params.userId, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};
