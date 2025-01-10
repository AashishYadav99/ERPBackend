// Routes for user_role
const express = require("express");
const user_role_Controller = require("../controller/user_role.controller");

const router = new express.Router();

// POST route to create a new record
router.post("/create", user_role_Controller.create);
router.get("/list", user_role_Controller.getAll);
router.get("/:id", user_role_Controller.getById);
router.put("/:id", user_role_Controller.update);
router.delete("/:id", user_role_Controller.delete);

module.exports = router;
