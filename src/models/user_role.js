"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class user_role extends Model {
    static associate(models) {
      // Define associations here
      //   this.belongsTo(models.user_master, { foreignKey: "user_id", as: "user" });
      //   this.belongsTo(models.sub_module_master, {
      //     foreignKey: "sub_module_id",
      //     as: "subModule",
      //   });
      //   this.belongsTo(models.function_master, {
      //     foreignKey: "function_master_id",
      //     as: "function",
      //   });
    }
  }

  user_role.init(
    {
      //   role_id: {
      //     type: DataTypes.BIGINT,
      //     autoIncrement: true,
      //     primaryKey: true,
      //     allowNull: false,
      //   },
      // user_id: {
      //   type: DataTypes.BIGINT,
      //   allowNull: false,
      // },
      uuid: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      module: {
        type: DataTypes.STRING(191),
        allowNull: false,
      },
      submodules: {
        type: DataTypes.STRING(191),
        allowNull: false,
      },
      functions: {
        type: DataTypes.STRING(191),
        allowNull: true,
      },
      can_edit: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
      },
      can_delete: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
      },
      can_view: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
      },
      can_rename: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
      },
      //   created_by: {
      //     type: DataTypes.BIGINT,
      //     allowNull: false,
      //   },
      //   updated_by: {
      //     type: DataTypes.BIGINT,
      //     allowNull: false,
      //   },
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
      modelName: "user_role",
      tableName: "user_roles",
      timestamps: true,
      paranoid: true, // Soft delete enabled
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  return user_role;
};
