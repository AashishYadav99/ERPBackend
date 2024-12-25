'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class grn_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user_master, {
          foreignKey: 'customer_id', 
          as: 'customer',
      });
      this.belongsTo(models.user_master, {
          foreignKey: 'salesman_id',
          as: 'salesman'
      });
  
    }
  }
  grn_details.init({
    uuid: DataTypes.CHAR(36),
    good_receipt_note_id: DataTypes.BIGINT.UNSIGNED,
    credit_note_detail_id: DataTypes.INTEGER(11),
    item_id: DataTypes.BIGINT.UNSIGNED,
    item_uom_id: DataTypes.BIGINT.UNSIGNED,
    qty: DataTypes.DECIMAL(18,2),
    variant_id: DataTypes.BIGINT.UNSIGNED,
    item_class_id: DataTypes.BIGINT.UNSIGNED,
    reason: DataTypes.STRING(191)
    
    
  }, {
    sequelize,
    modelName: 'grn_details',
    tableName: 'good_receipt_note_detail',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
  return grn_details;
}
