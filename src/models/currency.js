'use strict';
const bcrypt = require('bcrypt')
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class currency extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        
    }
    currency.init({
        name: DataTypes.STRING(255),
    }, {
        sequelize,
        modelName: 'currency',
        tableName: 'currency',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });
    return currency;
};