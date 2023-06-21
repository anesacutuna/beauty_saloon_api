const User = require("../models/user.model.js");

// Create and Save a new User
exports.createUser = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    } else {
      res.send(data);
    }
  });
};

// Delete a User with the specified id in the request
exports.deleteUser = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id
        });
      }
    } else {
      res.send({ message: `User with id ${req.params.id} was deleted successfully!` });
    }
  });
};

// Modify a User identified by the id in the request
exports.modifyUser = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.updateById(
    req.params.id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Retrieve all Users from the database.
exports.findAllUsers = (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    } else {
      res.send(data);
    }
  });
};

// User login
exports.login = (req, res) => {
    // Validate request
    if (!req.body || !req.body.email || !req.body.password) {
      res.status(400).send({
        message: "Invalid request. Please provide email and password."
      });
      return;
    }
  
    const email = req.body.email;
    const password = req.body.password;
  
    // Check if the user exists in the database
    User.getByEmail(email, (err, user) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving the user."
        });
        return;
      }
  
      if (!user) {
        res.status(404).send({ message: "User not found." });
        return;
      }
  
      // Perform password comparison or any other necessary checks
      if (user.password === password) {
        // Successful login
        res.send({ user: user });
      } else {
        // Failed login
        res.status(401).send({ message: "Invalid email or password." });
      }
    });
  };
