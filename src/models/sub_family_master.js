'use strict';
const {
  Model,DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sub_family_master extends Model {
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
  sub_family_master.init({
    uuid: DataTypes.STRING(255),
    organisation_id: DataTypes.BIGINT,
    itemsfamcode: DataTypes.STRING(255),
    itemsfamname: DataTypes.STRING(255),
    itemsfamlong: DataTypes.STRING(255),
    itemdeptname: DataTypes.STRING(255),
    itemfamcode: DataTypes.STRING(255),
    note1: DataTypes.STRING(255),
    note2: DataTypes.STRING(255),
    note3: DataTypes.STRING(255),
    itmsfamdt1: DataTypes.DATE,
    itmsfamdt2: DataTypes.DATE,
    addedby: DataTypes.BIGINT,
    status: DataTypes.TINYINT(1),
    
  }, {
    sequelize,
    modelName: 'sub_family_master',
    tableName: 'sub_family_master',
    timestamps:true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
  return sub_family_master;
};