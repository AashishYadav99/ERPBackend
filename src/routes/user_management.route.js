const express = require("express");
const user_management_Controller = require("../controller/user_management.controller"); // Import the controller

const router = new express.Router();

// POST route to create a new record
router.post("/create", user_management_Controller.create);
router.get("/list", user_management_Controller.getAll);

module.exports = router;
