'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.user_master, {foreignKey:'id'})
      this.belongsTo(models.item_major_category, {
        foreignKey: 'item_major_category_id', // Assuming 'user_id' is the foreign key in the customer_info table
        as: 'itemcategory' // Alias, optional but useful for clarity in queries
      });
      this.hasMany(models.item_main_price,
        {
          foreignKey: 'item_id',
          as: 'item_main_prices'
        });
    }
  }
  item_master.init({
    uuid: DataTypes.STRING(255),
    organisation_id: DataTypes.BIGINT,
    item_major_category_id: DataTypes.BIGINT,
    item_group_id: DataTypes.BIGINT,
    brand_id: DataTypes.BIGINT,
    lob_id: DataTypes.BIGINT,
    is_variant: DataTypes.TINYINT(4),
    is_product_catalog: DataTypes.TINYINT(4),
    supervisor_category_id: DataTypes.BIGINT,
    is_promo_allocation: DataTypes.STRING(255),
    is_promotional: DataTypes.TINYINT(4),
    short_code: DataTypes.STRING(255),
    item_code: DataTypes.STRING(255),
    erp_code: DataTypes.STRING(255),
    item_name: DataTypes.STRING(255),
    item_description: DataTypes.TEXT,
    item_barcode: DataTypes.STRING(255),
    item_weight: DataTypes.DECIMAL(18, 2),
    item_shelf_life: DataTypes.STRING(255),
    volume: DataTypes.DECIMAL(18, 2),
    lower_unit_item_upc: DataTypes.INTEGER(255),
    lower_unit_uom_id: DataTypes.BIGINT,
    lower_unit_item_price: DataTypes.DECIMAL(18, 2),
    unit_item_max_price: DataTypes.DECIMAL(18, 2),
    lower_unit_purchase_order_price: DataTypes.DECIMAL(18, 2),
    is_tax_apply: DataTypes.TINYINT(4),
    item_vat_percentage: DataTypes.DECIMAL(5, 2),
    is_item_excise: DataTypes.TINYINT(1),
    item_excise: DataTypes.DECIMAL(5, 2),
    item_excise_uom_id: DataTypes.BIGINT,
    new_lunch: DataTypes.TINYINT(1),
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    current_stage: DataTypes.STRING(255),
    current_stage_comment: DataTypes.TEXT,
    item_image: DataTypes.STRING(255),
    stock_keeping_unit: DataTypes.TINYINT(1),
    status: DataTypes.TINYINT(1),
    height: DataTypes.STRING(255),
    width: DataTypes.STRING(255),
    depth: DataTypes.STRING(255),
    is_coupon: DataTypes.INTEGER(11),
    coupon_id: DataTypes.INTEGER(11),
    pallet_case: DataTypes.DECIMAL(18, 2),
    rate: DataTypes.DECIMAL(18, 2),
    item_tax: DataTypes.BIGINT,
    stock: DataTypes.BIGINT,
    partNumber: DataTypes.STRING(255),
    barcode: DataTypes.STRING(255),
    batch_no: DataTypes.STRING(255),
    exp_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'item_master',
    tableName: 'items',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
  return item_master;
};