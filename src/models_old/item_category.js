'use strict';
const {
  Model,DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item_category extends Model {
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
  item_category.init({
    uuid: DataTypes.STRING(255),
    organisation_id: DataTypes.BIGINT,
    itemcatcode: DataTypes.STRING(255),
    itemcatname: DataTypes.STRING(255),
    itemdesclong: DataTypes.STRING(255),
    abcgroup: DataTypes.STRING(255),
    stockmgmt: DataTypes.STRING(255),
    negativestock: DataTypes.STRING(255),
    note1: DataTypes.STRING(255),
    note2: DataTypes.STRING(255),
    note3: DataTypes.STRING(255),
    itmcatdt1: DataTypes.DATE,
    itmcatdt2: DataTypes.DATE,
    addedby: DataTypes.BIGINT,
    status: DataTypes.TINYINT(1),
    
  }, {
    sequelize,
    modelName: 'item_category',
    tableName: 'item_categories',
    timestamps:true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
  return item_category;
};