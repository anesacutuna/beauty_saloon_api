module.exports = app => {
    const serviceController = require("../controllers/service.controller.js");

    var router = require("express").Router();

    router.get("/", serviceController.getAllServices);

    // Add a new service
    router.post("/", serviceController.addService);

    // Delete a service by ID
    router.delete("/:id", serviceController.deleteService);

    app.use('/api/services', router);

    module.exports = router;
}