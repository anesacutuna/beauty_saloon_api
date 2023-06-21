module.exports = app => {
    const bookingController = require("../controllers/booking.controller.js");
  
    var router = require("express").Router();
  
    // Create a new booking
    router.post("/", bookingController.createBooking);

    // Delete a booking by ID
    router.delete("/:id", bookingController.deleteBooking);

    //Accept or Deny a booking by ID
    router.put("/:id/accept-or-deny", bookingController.acceptOrDenyBooking);

    // Modify a booking by ID
    router.put("/:id", bookingController.modifyBooking);

    // Retrieve all bookings
    router.get("/", bookingController.findAllBookings);

    // Retrieve bookings by userId
    router.get("/user/:userId", bookingController.findBookingsByUserId);

    module.exports = router;
  
    app.use('/api/bookings', router);
  };
  