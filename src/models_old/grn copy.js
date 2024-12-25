'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class grn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user_master, {
          foreignKey: 'salesman_id',
          as: 'salesman'
      });
  
    }
  }
  grn.init({
    uuid: DataTypes.CHAR(36),
    organisation_id: DataTypes.BIGINT.UNSIGNED,
    salesman_id: DataTypes.BIGINT.UNSIGNED,
    route_id: DataTypes.BIGINT.UNSIGNED,
    trip_id: DataTypes.BIGINT.UNSIGNED,
    credit_note_id: DataTypes.INTEGER(11),
    is_damaged: DataTypes.ENUM('0','1','2'),
    source_warehouse: DataTypes.BIGINT.UNSIGNED,
    destination_warehouse: DataTypes.BIGINT.UNSIGNED,
    grn_number: DataTypes.STRING(191),
    grn_date: DataTypes.DATE,
    grn_remark: DataTypes.TEXT,
    status: DataTypes.TINYINT(1),
    is_sync: DataTypes.TINYINT(1),
    erp_id: DataTypes.STRING(191),
    erp_status: DataTypes.TEXT,
    approval_status: DataTypes.STRING(191),
    
  }, {
    sequelize,
    modelName: 'grn',
    tableName: 'good_receipt_note',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
  return grn;
}
