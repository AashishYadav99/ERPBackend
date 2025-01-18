"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class user_management extends Model {
    static associate(models) {}
  }
  user_management.init(
    {
      uuid: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      first_name: {
        type: DataTypes.STRING(191),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(191),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(191),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Ensures the value is a valid email
        },
      },
      country_code: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
          isNumeric: true, // Ensures the value contains only numbers
        },
      },
      location: {
        type: DataTypes.STRING(191),
        allowNull: true, // Optional field
      },
      organisation: {
        type: DataTypes.STRING(191),
        allowNull: true, // Optional field
      },
      role: {
        type: DataTypes.STRING(50),
        allowNull: false,
        // validate: {
        //   notEmpty: true,
        // },
      },
    },
    {
      sequelize,
      modelName: "user_management",
      tableName: "user_managements",
      timestamps: true,
      paranoid: true, // Soft delete enabled
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      hooks: {
        beforeCreate: (module, options) => {
          // You can add any preprocessing before creating a module
        },
        beforeUpdate: (module, options) => {
          // You can add any preprocessing before updating a module
        },
      },
    }
  );

  return user_management;
};
