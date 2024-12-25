'use strict';
const {
  Model,DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item_color extends Model {
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
  item_color.init({
    uuid: DataTypes.STRING(255),
    organisation_id: DataTypes.BIGINT,
    itemcolcode: DataTypes.STRING(255),
    itemcolname: DataTypes.STRING(255),
    itemcoldesclong: DataTypes.STRING(255),
    note1: DataTypes.STRING(255),
    note2: DataTypes.STRING(255),
    note3: DataTypes.STRING(255),
    itmcoldt1: DataTypes.DATE,
    itmcoldt2: DataTypes.DATE,
    addedby: DataTypes.BIGINT,
    status: DataTypes.TINYINT(1),
    
  }, {
    sequelize,
    modelName: 'item_color',
    tableName: 'item_colors',
    timestamps:true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
  return item_color;
};