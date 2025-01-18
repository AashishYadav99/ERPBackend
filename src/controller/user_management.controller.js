const { user_management } = require("../models/"); // Import the module_master model

exports.create = async (req, res) => {
  const {
    first_name,
    last_name,
    country_code,
    phone_number,
    email,
    rows, // Expecting an array of rows with { country, organization, location, action, selected }
  } = req.body;

  console.log("value is ", rows);

  try {
    // Transform rows for database storage if needed
    const transformedRows = rows.map((row) => ({
      country: row.country,
      organisation: row.organization,
      location: row.location,
      role: row.role,
      // selected: row.selected,
    }));

    // Create a new record in the database
    const newSubModule = await user_management.create({
      first_name,
      last_name,
      email,
      country_code,
      phone_number,
      rows: transformedRows, // Save the rows in your database
    });
    console.log("newSubModule....", newSubModule);

    // Return success response
    res.status(201).json({
      message: "user_management created successfully!",
      data: newSubModule,
    });
  } catch (error) {
    console.error("Error creating sub-module: ", error);
    res.status(500).json({
      message: "An error occurred while creating the user management.",
      error: error.message,
    });
  }
};

// Controller for creating a new record
// exports.create = async (req, res) => {
//   const {
//     first_name,
//     last_name,
//     email,
//     country_code,
//     phone_number,
//     location,
//     organisation,
//     role,
//   } = req.body;

//   try {
//     // Create a new record in the database
//     const newSubModule = await user_management.create({
//       first_name,
//       last_name,
//       email,
//       country_code,
//       phone_number,
//       location,
//       organisation,
//       role,
//     });

//     // Return success response
//     res.status(201).json({
//       message: "user_management created successfully!",
//       data: newSubModule,
//     });
//   } catch (error) {
//     console.error("Error creating sub-module: ", error);
//     res.status(500).json({
//       message: "An error occurred while creating the sub-module.",
//       error: error.message,
//     });
//   }
// };

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

// Controller for fetching a single record by ID
exports.getById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await user_management.findOne({
      where: { uuid: id, deleted_at: null },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(200).json({
      message: "User fetched successfully!",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user: ", error);
    res.status(500).json({
      message: "An error occurred while fetching the user.",
      error: error.message,
    });
  }
};

// Controller for updating a record
exports.update = async (req, res) => {
  const { id } = req.params;
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
    const user = await user_management.findOne({
      where: { id: id, deleted_at: null },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Update user fields
    await user.update({
      first_name,
      last_name,
      email,
      country_code,
      phone_number,
      location,
      organisation,
      role,
    });

    res.status(200).json({
      message: "User updated successfully!",
      data: user,
    });
  } catch (error) {
    console.error("Error updating user: ", error);
    res.status(500).json({
      message: "An error occurred while updating the user.",
      error: error.message,
    });
  }
};

// Controller for soft deleting a record
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await user_management.findOne({
      where: { id: id, deleted_at: null },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Soft delete by setting deleted_at timestamp
    await user.destroy();

    res.status(200).json({
      message: "User deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting user: ", error);
    res.status(500).json({
      message: "An error occurred while deleting the user.",
      error: error.message,
    });
  }
};
