const Service = require("../models/service.model.js");

// Display all services
exports.getAllServices = (req, res) => {
  Service.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving services."
      });
    } else {
      res.send(data);
    }
  });
};

// Add a new service
exports.addService = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Service
  const service = new Service({
    title: req.body.title,
    description: req.body.description
  });

  // Save Service in the database
  Service.create(service, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the service."
      });
    } else {
      res.send(data);
    }
  });
};

// Delete a service by ID
exports.deleteService = (req, res) => {
  Service.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found service with ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete service with ID " + req.params.id
        });
      }
    } else {
      res.send({ message: "Service was deleted successfully!" });
    }
  });
};
