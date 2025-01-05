const { user_management } = require("../models/"); // Import the module_master model

// Controller for creating a new record
exports.create = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    country_code,
    phone_number,
    location,
    organisation,
    role,
  } = req.body;

  try {
    // Create a new record in the database
    const newSubModule = await user_management.create({
      first_name,
      last_name,
      email,
      country_code,
      phone_number,
      location,
      organisation,
      role,
    });

    // Return success response
    res.status(201).json({
      message: "user_management created successfully!",
      data: newSubModule,
    });
  } catch (error) {
    console.error("Error creating sub-module: ", error);
    res.status(500).json({
      message: "An error occurred while creating the sub-module.",
      error: error.message,
    });
  }
};

// Controller for fetching all records
exports.getAll = async (req, res) => {
  try {
    const modules = await user_management.findAll({
      where: { deleted_at: null },
    });

    res.status(200).json({
      message: "user_management fetched successfully!",
      data: modules,
    });
  } catch (error) {
    console.error("Error fetching modules: ", error);
    res.status(500).json({
      message: "An error occurred while fetching the modules.",
      error: error.message,
    });
  }
};
