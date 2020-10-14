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
  console.log("valeur de user dans la fonction createUser : " + user);
  
  const bcrypt = require("bcrypt");

  const query = "INSERT INTO user SET ?";
  console.log("contenu de la const query : " + query);

  console.log("avant hash");
    bcrypt.hash(user.password, 10, function (err,hash) {
      console.log("apres hash");
      if (err) return callback(err);

      const data = {
        username: user.username,
        password: hash,
        email: user.email,
        roles: "[]",
      };
      console.log("contenu de la const data : " + data);
      sql.query(query, data, function (err, results) {
        if (err) return callback(err);
        if (results.length === 0) return callback();
        callback(null);
      });
    });
};

User.loginUser = function (user, callback) {
  

  const bcrypt = require("bcrypt");

  const query =
    "SELECT  email, password FROM user WHERE email = ?";
    console.log("contenu de la const query : " + query);


    sql.query(query, [user.email], function (err, results) { //results renvoi le contenu du callback 

      if (err) return callback(err);
      if (results.length === 0)
        return callback(new WrongUsernameOrPasswordError(user.email));
      const user_bdd = results[0]; //stockage du résultat de ma requete mysql

        console.log('form : ' + user.password); //password venant de mon formulaire
        console.log('bdd : ' + user_bdd.password); //pasword venant de la bdd (crypté en bcrypt)

      bcrypt.compare( user.password, user_bdd.password,function (err, isValid) { //compare de bcrypt va faire la comparaison du password du formulaire avec le password de la bdd

        if (err || !isValid) // si erreur ou différent de valide alors je retourne l'erreur Wrong Username or Password
          return callback(err || new WrongUsernameOrPasswordError(user.email));

       callback(null, {
          username: user.username,
          email: user.email,
          password: user.password,
          "compte valide ?":('Compte valide !'),
        });
      });
    });
    console.log("valeur de user dans la fonction loginUser : " + user);
  }


module.exports = User;
