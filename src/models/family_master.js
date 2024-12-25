'use strict';
const {
  Model,DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class family_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.user_master, {foreignKey:'id'})
    }
  }
  family_master.init({
    uuid: DataTypes.STRING(255),
    organisation_id: DataTypes.BIGINT,
    itemfamcode: DataTypes.STRING(255),
    itemfamname: DataTypes.STRING(255),
    itemfamlong: DataTypes.STRING(255),
    itemdeptname: DataTypes.STRING(255),
    note1: DataTypes.STRING(255),
    note2: DataTypes.STRING(255),
    note3: DataTypes.STRING(255),
    itmfamdt1: DataTypes.DATE,
    itmfamdt2: DataTypes.DATE,
    addedby: DataTypes.BIGINT,
    status: DataTypes.TINYINT(1),
    
  }, {
    sequelize,
    modelName: 'family_master',
    tableName: 'family_master',
    timestamps:true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
  return family_master;
};