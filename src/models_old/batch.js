'use strict';
const {
  Model,DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class batch extends Model {
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
  batch.init({
    uuid: DataTypes.STRING(255),
    item_id: DataTypes.BIGINT,
    batch_number: DataTypes.STRING(255),
    batch_mcu: DataTypes.STRING(255),
    manufacturing_date: DataTypes.DATE,
    expiry_date: DataTypes.DATE,
    manufactured_by: DataTypes.STRING(255),
    qty: DataTypes.DECIMAL(18,2),
    current_in_stock: DataTypes.DECIMAL(18,2),
    stock_out_sequence: DataTypes.INTEGER(11),
    status: DataTypes.TINYINT(1),
    location: DataTypes.STRING(255),
    
  }, {
    sequelize,
    modelName: 'batch',
    tableName: 'batches',
    timestamps:true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
  return batch;
};