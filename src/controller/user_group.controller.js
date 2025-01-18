const { user_group, module_master, sub_module_master, function_master, action_master } = require("../models");

// Controller for fetching permissions by role IDs (query parameter)
exports.getPermissionsByRoleId = async (req, res) => {
  // Log to see if the role_ids are coming correctly
  console.log("role_ids: ", req.query.role_ids);

  let roleIds = req.query.role_ids;
  if (typeof roleIds === "string") {
    roleIds = [roleIds]; // If it's a single role_id, convert it to an array
  }

  if (!roleIds || roleIds.length === 0) {
    return res.status(400).json({
      message: "Role IDs are required.",
    });
  }

  try {
    const userRoles = await user_group.findAll({
      where: {
        role_id: roleIds, 
        deleted_at: null,
      },
      include: [
        { model: module_master, as: "module" },
        { model: sub_module_master, as: "subModule" },
        { model: function_master, as: "function" },
        { model: action_master, as: "actions" },
      ],
    });

    if (userRoles.length === 0) {
      return res.status(404).json({
        message: "Permissions not found for the specified role(s).",
      });
    }

    const permissions = userRoles.map((userRole) => ({
      module_id: userRole.module_id,
      sub_module_id: userRole.sub_module_id,
      function_master_id: userRole.function_master_id,
      action_id: userRole.action_id,
      module_name: userRole.module.module_name,
      sub_module_name: userRole.subModule.sub_module_name,
      function_name: userRole.function.function_master_name,
      action_name: userRole.actions.action_name,
    }));

    res.status(200).json({
      message: "Permissions fetched successfully!",
      data: permissions,
    });
  } catch (error) {
    console.error("Error fetching permissions: ", error);
    res.status(500).json({
      message: "An error occurred while fetching permissions.",
      error: error.message,
    });
  }
};

exports.bulkCreate = async (req, res) => {
  const { data } = req.body;
  console.log("Data received from frontend:", data);

  if (!Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ message: "Invalid data format or empty data" });
  }

  try {
    // Validate each entry before bulk creating
    const invalidEntries = data.filter((entry) => 
      !entry.module_id || !entry.sub_module_id || !entry.function_master_id || !entry.role_id || !entry.action_id
    );
    if (invalidEntries.length > 0) {
      return res.status(400).json({
        message: "Some entries are missing required fields.",
        data: invalidEntries
      });
    }

    // Bulk create user roles in the database
    const newUserRoles = await user_group.bulkCreate(data, { validate: true });

    return res.status(201).json({
      message: "User roles created successfully!",
      data: newUserRoles,
    });
  } catch (error) {
    console.error("Error bulk creating user roles:", error);
    return res.status(500).json({
      message: "An error occurred while creating the user roles.",
      error: error.message,
      stack: error.stack,  // Adding stack trace for debugging
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const roles = await user_group.findAll({
      where: { deleted_at: null },
    });

    return res.status(200).json({
      message: "User roles fetched successfully!",
      data: roles,
    });
  } catch (error) {
    console.error("Error fetching user roles:", error);
    return res.status(500).json({
      message: "An error occurred while fetching user roles.",
      error: error.message,
    });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await user_group.findOne({
      where: { role_id: id, deleted_at: null },
    });

    if (!role) {
      return res.status(404).json({ message: "User role not found." });
    }

    return res.status(200).json({
      message: "User role fetched successfully!",
      data: role,
    });
  } catch (error) {
    console.error("Error fetching user role:", error);
    return res.status(500).json({
      message: "An error occurred while fetching the user role.",
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { can_edit, can_delete, can_view, can_rename, updated_by } = req.body;

  try {
    const role = await user_group.findOne({
      where: { role_id: id, deleted_at: null },
    });

    if (!role) {
      return res.status(404).json({ message: "User role not found." });
    }

    await role.update({ can_edit, can_delete, can_view, can_rename, updated_by });

    return res.status(200).json({
      message: "User role updated successfully!",
      data: role,
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    return res.status(500).json({
      message: "An error occurred while updating the user role.",
      error: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await user_group.findOne({
      where: { role_id: id, deleted_at: null },
    });

    if (!role) {
      return res.status(404).json({ message: "User role not found." });
    }

    await role.destroy();

    return res.status(200).json({
      message: "User role deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting user role:", error);
    return res.status(500).json({
      message: "An error occurred while deleting the user role.",
      error: error.message,
    });
  }
};
