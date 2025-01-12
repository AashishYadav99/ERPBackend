'use strict';

// migrations/xxxxxx-create-function-action-master-map.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('function_action_master_maps', {
      function_action_master_map_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      function_master_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'function_masters', // This references the function_master table
          key: 'function_master_id', // This is the column in function_masters table
        },
        onDelete: 'CASCADE', // When a function_master is deleted, the relationship is deleted
      },
      action_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        // Assuming an 'action_masters' table exists, you can add the following:
        // references: {
        //   model: 'action_masters',
        //   key: 'action_id',
        // },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('function_action_master_maps');
  },
};
