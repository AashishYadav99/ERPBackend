"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class function_master extends Model {
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
  function_master.init(
    {
      function_master_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      module_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      sub_module_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      function_master_name: {
        type: DataTypes.STRING(191),
        allowNull: false,
      },

      function_master_description: {
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
        defaultValue: 1,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW,
      },
      date1: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW,
      },
      date2: {
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
      note1: {
        type: DataTypes.CHAR(255),
        allowNull: true,
      },
      note2: {
        type: DataTypes.CHAR(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "function_master",
      tableName: "function_masters",
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

  return function_master;
};
