'user strict'; //fichier qui gère les requetes à la bdd

var sql = require('./db.js');

//Taskobjectconstructor
var Task = function (task) {
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

// méthode createtask
Task.createTask = function (newTask, result) {

    sql.query("INSERT INTO tasks set ?", newTask, function (err, res) {
        if (err) {
            console.log("error:", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Task.getTaskById = function (taskId, result) {
    sql.query("Select task from tasks where id = ?", taskId, function (err, res) {
        if (err) {
            console.log("error:", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Task.getAllTask = function (result) {
    sql.query("Select * from tasks", function (err, res) {
        if (err) {
            console.log("error:", err);
            result(null, err);
        } else {
            console.log('tasks:', res);
            result(null, res);
        }
    });
};

Task.updateById = function (id, task, result) {
    sql.query("UPDATE tasks SET task = ? WHERE id = ?", [task.task, id], function (err, res) {
        if (err) {
            console.log("error:", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Task.remove = function (id, result) {
    sql.query("DELETE FROM tasks WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error:", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


module.exports = Task;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Userobjectconstructor
var User = function (user) {
    this.user = user.user;
    this.email = user.email;
    this.password = user.password;
};

// méthode createtask
User.createUser = function (user, callback) {
    const bcrypt = require('bcrypt');

    const query = 'INSERT INTO user SET ?';


  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) return callback(err);

    const insert = {
      password: hash,
      email: user.email
    };

    sql.query(query, insert, function(err, results) {
      if (err) return callback(err);
      if (results.length === 0) return callback();
      callback(null);
    });
  });
}

  module.exports = User;
