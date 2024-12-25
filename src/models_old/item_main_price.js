'use strict';
const {
  Model,DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item_main_price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.user_master, {foreignKey:'id'})
      this.belongsTo(models.item_uom, {
        foreignKey: 'item_uom_id', // Assuming 'user_id' is the foreign key in the customer_info table
        as: 'item_uom' // Alias, optional but useful for clarity in queries
      });
    }
  }
  item_main_price.init({
    uuid: DataTypes.STRING(255),
    item_id: DataTypes.BIGINT,
    item_upc: DataTypes.STRING(255),
    item_uom_id: DataTypes.BIGINT,
    stock_keeping_unit: DataTypes.TINYINT(1),
    uom_type: DataTypes.ENUM('1','2','3','4'),
    uom_barcode: DataTypes.STRING(255),
    uom_cost: DataTypes.DOUBLE(10,2),
    sell_enable: DataTypes.INTEGER(11),
    return_enable: DataTypes.INTEGER(11),
    item_price: DataTypes.DECIMAL(18,2),
    item_main_max_price: DataTypes.DECIMAL(18,2),
    purchase_order_price: DataTypes.DECIMAL(18,2),
    status: DataTypes.TINYINT(1)
    
  }, {
    sequelize,
    modelName: 'item_main_price',
    tableName: 'item_main_prices',
    timestamps:true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
  return item_main_price;
};