const sql = require("./db.js");

// User constructor
const User = function (user) {
  this.fullName = user.fullName;
  this.email = user.email;
  this.password = user.password;
};

// Create a new User
User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

// Delete a User by id
User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // No user found with the specified id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

// Update a User by id
User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET fullName = ?, email = ?, password = ? WHERE id = ?",
    [user.fullName, user.email, user.password, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // No user found with the specified id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

// Retrieve all Users
User.getAll = (result) => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

// Retrieve a user by email
User.getByEmail = (email, result) => {
    sql.query("SELECT * FROM users WHERE email = ?", email, (err, res) => {
      if (err) {
        console.log("Error while retrieving user by email:", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        // Found user
        result(null, res[0]);
        return;
      }
    });
  };
  

module.exports = User;
