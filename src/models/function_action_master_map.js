"use strict";
const { Model } = require("sequelize");

// models/function_action_master_map.js
module.exports = (sequelize, DataTypes) => {
    class function_action_master_map extends Model {
      static associate(models) {
        // Define relationships if necessary
      }
    }
  
    function_action_master_map.init(
      {
        function_action_master_map_id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        function_master_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: "function_masters", // referencing the function_master table
            key: "function_master_id",
          },
        },
        action_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          // You might need to add foreign key reference to your action_master table
        },
      },
      {
        sequelize,
        modelName: "function_action_master_map",
        tableName: "function_action_master_maps",
        timestamps: false,
      }
    );
  
    return function_action_master_map;
  };
  