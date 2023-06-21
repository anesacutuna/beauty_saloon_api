const Booking = require("../models/booking.model.js");

// Create and Save a new Booking
exports.createBooking = (req, res) => {
  // Validate request
  if (!req.body || !req.body.userId) {
    res.status(400).send({
      message: "Invalid request. Please provide userId."
    });
    return;
  }

  // Create a Booking
  const booking = new Booking({
    title: req.body.title,
    description: req.body.description,
    serviceId: req.body.serviceId,
    published: req.body.published || false,
    userId: req.body.userId,
  });

  // Save Booking in the database
  Booking.create(booking, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Booking."
      });
    } else {
      res.send(data);
    }
  });
};

// Delete a Booking with the specified id in the request
exports.deleteBooking = (req, res) => {
  Booking.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Booking with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Booking with id " + req.params.id
        });
      }
    } else res.send({ message: `Booking was deleted successfully!` });
  });
};

// Accept or Deny a Booking identified by the id in the request
exports.acceptOrDenyBooking = (req, res) => {
  // Validate Request
  if (!req.body || !req.body.status) {
    res.status(400).send({
      message: "Status can not be empty!"
    });
  }

  const status = req.body.status;

  Booking.updateStatusById(
    req.params.id,
    status,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Booking with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Booking with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Modify a Booking identified by the id in the request
exports.modifyBooking = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Booking.updateById(
    req.params.id,
    new Booking(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Booking with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Booking with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Retrieve all Bookings from the database.
exports.findAllBookings = (req, res) => {
  Booking.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving bookings."
      });
    else res.send(data);
  });
};

exports.findBookingsByUserId = (req, res) => {
  const userId = req.params.userId;

  Booking.getByUserId(userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bookings by userId."
      });
    } else {
      res.send(data);
    }
  });
};
