const { user_role } = require("../models/"); // Import the user_role model

// Controller for creating a new record
// exports.create = async (req, res) => {
//   const {
//     user_id,
//     module_id,
//     sub_module_id,
//     function_master_id,
//     can_edit,
//     can_delete,
//     can_view,
//     can_rename,
//     // created_by,
//     // updated_by,
//   } = req.body;

//   try {
//     // Create a new record in the database
//     const newUserRole = await user_role.create({
//       user_id,
//       module_id,
//       sub_module_id,
//       function_master_id,
//       can_edit,
//       can_delete,
//       can_view,
//       can_rename,
//       // created_by,
//       // updated_by,
//     });

//     // Return success response
//     res.status(201).json({
//       message: "User role created successfully!",
//       data: newUserRole,
//     });
//   } catch (error) {
//     console.error("Error creating user role: ", error);
//     res.status(500).json({
//       message: "An error occurred while creating the user role.",
//       error: error.message,
//     });
//   }
// };

// Controller for creating multiple records
exports.create = async (req, res) => {
  const { data } = req.body; // Extract an array of user roles from the request body
  console.log("data is ", data);

  if (!Array.isArray(data) || data.length === 0) {
    return res
      .status(400)
      .json({ message: "Invalid data format or empty data" });
  }

  try {
    // Bulk create user roles in the database
    const newUserRoles = await user_role.bulkCreate(data, { validate: true });

    // Return success response
    res.status(201).json({
      message: "User roles created successfully!",
      data: newUserRoles,
    });
  } catch (error) {
    console.error("Error bulk creating user roles: ", error);
    res.status(500).json({
      message: "An error occurred while creating the user roles.",
      error: error.message,
    });
  }
};

// Controller for fetching all records
exports.getAll = async (req, res) => {
  try {
    const roles = await user_role.findAll({
      where: { deleted_at: null },
    });

    res.status(200).json({
      message: "User roles fetched successfully!",
      data: roles,
    });
  } catch (error) {
    console.error("Error fetching user roles: ", error);
    res.status(500).json({
      message: "An error occurred while fetching user roles.",
      error: error.message,
    });
  }
};

// Controller for fetching a single record by ID
exports.getById = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await user_role.findOne({
      where: { role_id: id, deleted_at: null },
    });

    if (!role) {
      return res.status(404).json({
        message: "User role not found.",
      });
    }

    res.status(200).json({
      message: "User role fetched successfully!",
      data: role,
    });
  } catch (error) {
    console.error("Error fetching user role: ", error);
    res.status(500).json({
      message: "An error occurred while fetching the user role.",
      error: error.message,
    });
  }
};

// Controller for updating a record
exports.update = async (req, res) => {
  const { id } = req.params;
  const { can_edit, can_delete, can_view, can_rename, updated_by } = req.body;

  try {
    const role = await user_role.findOne({
      where: { role_id: id, deleted_at: null },
    });

    if (!role) {
      return res.status(404).json({
        message: "User role not found.",
      });
    }

    // Update role fields
    await role.update({
      can_edit,
      can_delete,
      can_view,
      can_rename,
      updated_by,
    });

    res.status(200).json({
      message: "User role updated successfully!",
      data: role,
    });
  } catch (error) {
    console.error("Error updating user role: ", error);
    res.status(500).json({
      message: "An error occurred while updating the user role.",
      error: error.message,
    });
  }
};

// Controller for soft deleting a record
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await user_role.findOne({
      where: { role_id: id, deleted_at: null },
    });

    if (!role) {
      return res.status(404).json({
        message: "User role not found.",
      });
    }

    // Soft delete by setting deleted_at timestamp
    await role.destroy();

    res.status(200).json({
      message: "User role deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting user role: ", error);
    res.status(500).json({
      message: "An error occurred while deleting the user role.",
      error: error.message,
    });
  }
};
