const { user_management } = require("../models/");

exports.create = async (req, res) => {
  const {
    first_name,
    last_name,
    country_code,
    phone_number,
    email,
    rows, // Expecting an array of rows with { country, organization, location, role_id, selected }
  } = req.body;

  console.log("Received rows:", rows);

  try {
    // Check if each row has a valid role_id (ensuring it's not empty)
    const invalidRows = rows.filter((row) => !row.role_id || isNaN(Number(row.role_id))); // Validate role_id
    if (invalidRows.length > 0) {
      return res.status(400).json({
        message: "Please select a valid role for each entry.",
        error: "Invalid or missing role_id in some entries.",
      });
    }

    // Transform rows for database storage
    const transformedRows = rows.map((row) => ({
      country: row.country,
      organisation: row.organization,
      location: row.location,
      role_id: Number(row.role_id), // Ensure role_id is an integer
      selected: row.selected || false,
      is_primary: row.selected === true ? true : false, // Ensure only one role_id is set as primary
    }));
    // Create a new user management record in the database
    exports.create = async (req, res) => {
      const {
        first_name,
        last_name,
        country_code,
        phone_number,
        email,
        rows, // Expecting an array of rows with { country, organization, location, role_id, selected }
      } = req.body;
    
      console.log("Received rows:", rows);
    
      try {
        // Check if each row has a valid role_id (ensuring it's not empty)
        const invalidRows = rows.filter((row) => !row.role_id || isNaN(Number(row.role_id))); // Validate role_id
        if (invalidRows.length > 0) {
          return res.status(400).json({
            message: "Please select a valid role for each entry.",
            error: "Invalid or missing role_id in some entries.",
          });
        }
    
        // Transform rows for database storage
        const transformedRows = rows.map((row) => ({
          country: row.country,
          organisation: row.organization,
          location: row.location,
          role_id: Number(row.role_id), // Ensure role_id is an integer
          selected: row.selected || false,
          is_primary: row.selected === true ? true : false, // Ensure only one role_id is set as primary
        }));
    
        // Create the main user_management record
        const newSubModule = await user_management.create({
          first_name,
          last_name,
          email,
          country_code,
          phone_number,
        });
    
        // Now, associate the rows with the newly created user_management record
        // Assuming a model association like user_management.hasMany(Role)
        for (const row of transformedRows) {
          await newSubModule.createRole({
            country: row.country,
            organisation: row.organisation,
            location: row.location,
            role_id: row.role_id,
            selected: row.selected,
            is_primary: row.is_primary,
          });
        }
    
        console.log("New user_management record created:", newSubModule);
    
        // Return success response
        res.status(201).json({
          message: "User management created successfully!",
          data: newSubModule,
        });
      } catch (error) {
        console.error("Error creating sub-module:", error);
        res.status(500).json({
          message: "An error occurred while creating the user management.",
          error: error.message,
        });
      }
    };    

    console.log("New user_management record created:", newSubModule);

    // Return success response
    res.status(201).json({
      message: "User management created successfully!",
      data: newSubModule,
    });
  } catch (error) {
    console.error("Error creating sub-module:", error);
    res.status(500).json({
      message: "An error occurred while creating the user management.",
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
      message: "User management fetched successfully!",
      data: modules,
    });
  } catch (error) {
    console.error("Error fetching modules:", error);
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
    console.error("Error fetching user:", error);
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
    role_id,
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
      role_id,
    });

    res.status(200).json({
      message: "User updated successfully!",
      data: user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
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
    console.error("Error deleting user:", error);
    res.status(500).json({
      message: "An error occurred while deleting the user.",
      error: error.message,
    });
  }
};
