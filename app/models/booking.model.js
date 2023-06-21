const sql = require("./db.js");

// constructor
const Booking = function(booking) {
  this.title = booking.title;
  this.description = booking.description;
  this.serviceId = booking.serviceId;
  this.published = booking.published;
  this.userId = booking.userId;
  this.status = booking.status;
};

Booking.create = (newBooking, result) => {
  sql.query("INSERT INTO bookings SET ?", newBooking, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created booking: ", { id: res.insertId, ...newBooking });
    result(null, { id: res.insertId, ...newBooking });
  });
};

Booking.findById = (id, result) => {
  sql.query(`SELECT * FROM bookings WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found booking: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Booking with the id
    result({ kind: "not_found" }, null);
  });
};

Booking.getAll = result => {
  sql.query("SELECT * FROM bookings", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("bookings: ", res);
    result(null, res);
  });
};

Booking.updateById = (id, booking, result) => {
  sql.query(
    "UPDATE bookings SET title = ?, description = ?, published = ? WHERE id = ?",
    [booking.title, booking.description, booking.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Booking with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated booking: ", { id: id, ...booking });
      result(null, { id: id, ...booking });
    }
  );
};

Booking.remove = (id, result) => {
  sql.query("DELETE FROM bookings WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Booking with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted booking with id: ", id);
    result(null, res);
  });
};

Booking.updateStatusById = (id, status, result) => {
  sql.query(
    "UPDATE bookings SET status = ? WHERE id = ?",
    [status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Booking with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated booking status: ", { id: id, status: status });
      result(null, { id: id, status: status });
    }
  );

  Booking.getByUserId = (userId, result) => {
    sql.query("SELECT * FROM bookings WHERE userId = ?", userId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("bookings by userId: ", res);
      result(null, res);
    });
  };
};

module.exports = Booking;
