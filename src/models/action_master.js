"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class action_master extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  action_master.init(
    {
      action_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      action_name: {
        type: DataTypes.STRING(191),
        allowNull: false,
        unique: true,
      },
      created_by: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      sorting_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      modelName: "action_master",
      tableName: "action_masters",
      timestamps: true,
      paranoid: true, // Enables soft delete
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return action_master;
};
