module.exports = app => {
    const userController = require("../controllers/user.controller.js");

    var router = require("express").Router();

    // Create a new user
    router.post("/register", userController.createUser);

    router.post("/login", userController.login);

    // Delete a user by ID
    router.delete("/:id", userController.deleteUser);

    // Modify a user by ID
    router.put("/:id", userController.modifyUser);

    // Retrieve all users
    router.get("/", userController.findAllUsers);

    app.use('/api/user', router);

    module.exports = router;
}