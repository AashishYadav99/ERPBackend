'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      this.hasMany(models.order_details,
        {
          foreignKey: 'order_id',
          as: 'order_details'
        });
      this.hasOne(models.invoice,
        {
          foreignKey: 'order_id',
          as: 'invoice'
        });
      this.hasOne(models.grn,
        {
          foreignKey: 'order_id',
          as: 'grn'
        });
      this.belongsTo(models.user_master, {
        foreignKey: 'customer_id',
        as: 'customer',
      });
      this.belongsTo(models.user_master, {
        foreignKey: 'salesman_id',
        as: 'salesman'
      });
      this.belongsTo(models.payment_terms, {
        foreignKey: 'payment_term_id',
        as: 'payment_terms',
      });
      //   this.belongsToMany(models.order_details, {
      //     foreignKey: 'id',
      //     otherKey: 'order_id',
      //     as: 'order_details'
      // });
    }
  }
  order.init({
    uuid: DataTypes.CHAR(36),
    organisation_id: DataTypes.BIGINT,
    customer_id: DataTypes.BIGINT,
    depot_id: DataTypes.BIGINT,
    order_type_id: DataTypes.BIGINT,
    salesman_id: DataTypes.BIGINT,
    route_id: DataTypes.BIGINT,
    storage_location_id: DataTypes.BIGINT,
    customer_lop: DataTypes.STRING(191),
    order_number: DataTypes.STRING(191),
    transaction_type: DataTypes.STRING(191),
    payment_id: DataTypes.STRING(191),
    payment_term_id: DataTypes.BIGINT,
    order_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
    delivery_date: DataTypes.DATE,
    total_qty: DataTypes.DECIMAL(18, 2),
    total_weight: DataTypes.DECIMAL(18, 2),
    total_pallet: DataTypes.DECIMAL(18, 2),
    total_pallet_volume: DataTypes.DECIMAL(18, 2),
    total_gross: DataTypes.DECIMAL(18, 2),
    total_discount_amount: DataTypes.DECIMAL(18, 2),
    total_net: DataTypes.DECIMAL(18, 2),
    total_vat: DataTypes.DECIMAL(18, 2),
    total_excise: DataTypes.DECIMAL(18, 2),
    grand_total: DataTypes.DECIMAL(18, 2),
    any_comment: DataTypes.TEXT,
    current_stage: DataTypes.ENUM('Pending', 'Approved', 'Rejected', 'In-Process', 'Partial-Deliver', 'Completed', 'Assigned'),
    current_stage_comment: DataTypes.TEXT,
    approval_status: DataTypes.ENUM('Deleted', 'Created', 'Updated', 'In-Process', 'Partial-Delivered', 'Delivered', 'Completed', 'Cancel', 'Assigned', 'On-Hold'),
    is_sync: DataTypes.TINYINT(1),
    erp_id: DataTypes.INTEGER(11),
    erp_status: DataTypes.TEXT,
    sign_image: DataTypes.STRING(191),
    source: DataTypes.INTEGER(11),
    status: DataTypes.STRING(191),
    is_recurring: DataTypes.TINYINT(4),
    is_load_created: DataTypes.TINYINT(4),
    lob_id: DataTypes.BIGINT,
    order_request_json: DataTypes.TEXT,
    source_order_number: DataTypes.STRING(191),
    delivery_charge: DataTypes.DECIMAL(18, 2),
    card_type: DataTypes.STRING(191),
    card_charge: DataTypes.DECIMAL(18, 2),
    recurring_id: DataTypes.INTEGER(11),
    customer_address_id: DataTypes.BIGINT,
    cancel_reason: DataTypes.TEXT,
    cancel_department: DataTypes.TEXT,
    source_ref_number: DataTypes.TEXT,
    created_by: DataTypes.BIGINT,
    order_type: DataTypes.STRING(191),
    type: DataTypes.STRING(191),
    taxable_total :DataTypes.DECIMAL(18,2),
    cgst_amount :DataTypes.DECIMAL(18,2),
    sgst_amount :DataTypes.DECIMAL(18,2),
    igst_amount :DataTypes.DECIMAL(18,2),
    // deleted_at:DataTypes.TIMESTAMPS,
  }, {
    sequelize,
    modelName: 'order',
    tableName: 'orders',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
  return order;
}
