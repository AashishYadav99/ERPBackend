"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class user_management extends Model {
    static associate(models) {
      // This association will reference the role_master's role_id
      user_management.belongsTo(models.role_master, {
        foreignKey: 'role_id', // role_id in user_management table
        as: 'role', // Alias for the association
      });
    }
  }

  user_management.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
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
          isEmail: true,
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
          isNumeric: true,
        },
      },
      location: {
        type: DataTypes.STRING(191),
        allowNull: true,
      },
      organisation: {
        type: DataTypes.STRING(191),
        allowNull: true,
      },
      role_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "role_masters", // Reference to role_master table
          key: "role_id", // Reference to role_master's role_id column
        },
      },
      is_primary: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "user_management",
      tableName: "user_managements",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  return user_management;
};
