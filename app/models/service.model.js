const sql = require("./db.js");

// Service constructor
const Service = function(service) {
    this.id = service.id;
    this.title = service.title;
    this.description = service.description;
};

Service.create = (newService, result) => {
  sql.query("INSERT INTO services SET ?", newService, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created service: ", { id: res.insertId, ...newService });
    result(null, { id: res.insertId, ...newService });
  });
};

Service.getAll = (result) => {
  sql.query("SELECT * FROM services", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("services: ", res);
    result(null, res);
  });
};

Service.remove = (id, result) => {
  sql.query("DELETE FROM services WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found service with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted service with id: ", id);
    result(null, res);
  });
};

module.exports = Service;
