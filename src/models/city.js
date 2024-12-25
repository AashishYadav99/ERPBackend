'use strict';
const bcrypt = require('bcrypt')
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class city extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        
    }
    city.init({
        name: DataTypes.STRING(255),
        country_id: DataTypes.BIGINT,
        state_id: DataTypes.BIGINT,
    }, {
        sequelize,
        modelName: 'city',
        tableName: 'cities',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });
    return city;
};