"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class sub_module_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define any associations here, e.g., foreign key relationships
      //   this.belongsTo(models.user_master, {
      //     foreignKey: "created_by",
      //     as: "creator",
      //   });
      //   this.belongsTo(models.user_master, {
      //     foreignKey: "updated_by",
      //     as: "updater",
      //   });
    }
  }
  sub_module_master.init(
    {
      module_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      sub_module_name: {
        type: DataTypes.STRING(191),
        allowNull: false,
      },
      sub_module_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      sub_module_description: {
        type: DataTypes.STRING(191),
        allowNull: true,
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
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      status: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 1, // Active by default
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "sub_module_master",
      tableName: "sub_module_masters",
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

  return sub_module_master;
};
