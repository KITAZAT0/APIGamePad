"user strict"; //fichier qui gère les requetes à la bdd

var sql = require("./db.js");

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
      console.log("tasks:", res);
      result(null, res);
    }
  });
};

Task.updateById = function (id, task, result) {
  sql.query(
    "UPDATE tasks SET task = ? WHERE id = ?",
    [task.task, id],
    function (err, res) {
      if (err) {
        console.log("error:", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
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
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
};

// méthode createtask
User.createUser = function (user, callback) {
  const argon2 = require("argon2");

  const query = "INSERT INTO user SET ?";
  console.log("avant hash");
  argon2.hash(user.password, {type: argon2.argon2id}, function (err, hash) {
    console.log("apres hash");
    if (err) return callback(err);

    const insert = {
      username: user.username,
      password: hash,
      email: user.email,
    };

    sql.query(query, insert, function (err, results) {
      if (err) return callback(err);
      if (results.length === 0) return callback();
      callback(null);
    });
  });
};

User.getloginUser = function (email, password, callback) {
  const bcrypt = require("bcrypt");

  const hash = { password: hash };

  const query = "SELECT id, username, email, password FROM user WHERE email = ?";

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return callback(err);

    sql.query(query, [email], function (err, results) {
      if (err) return callback(err);
      if (results.length === 0)
        return callback(new WrongUsernameOrPasswordError(email));
      const user = results[0];

      bcrypt.compare(hash, user.password, function (err, isValid) {
        if (err || !isValid)
          return callback(err || new WrongUsernameOrPasswordError(email));

        callback(null, {
          user_id: user.id.toString(),
          username: user.username,
          email: user.email,
          password: user.password
        });
      });
    });
  });
};

module.exports = User;
