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
        this.belongsTo(models.item_color, {
          foreignKey: 'colorname', // Assuming 'user_id' is the foreign key in the customer_info table
          as: 'item_color' // Alias, optional but useful for clarity in queries
        });
        this.belongsTo(models.size_master, {
          foreignKey: 'sizename', // Assuming 'user_id' is the foreign key in the customer_info table
          as: 'size_master' // Alias, optional but useful for clarity in queries
        });
        this.belongsTo(models.item_department, {
          foreignKey: 'departname', // Assuming 'user_id' is the foreign key in the customer_info table
          as: 'item_department' // Alias, optional but useful for clarity in queries
        });
        this.belongsTo(models.family_master, {
          foreignKey: 'familyname', // Assuming 'user_id' is the foreign key in the customer_info table
          as: 'family_master' // Alias, optional but useful for clarity in queries
        });
        this.belongsTo(models.sub_family_master, {
          foreignKey: 'subfamliy', // Assuming 'user_id' is the foreign key in the customer_info table
          as: 'sub_family_master' // Alias, optional but useful for clarity in queries
        });
        this.belongsTo(models.brand, {
          foreignKey: 'brandname', // Assuming 'user_id' is the foreign key in the customer_info table
          as: 'brand' // Alias, optional but useful for clarity in queries
        });
        this.belongsTo(models.item_uom, {
          foreignKey: 'itmuom', // Assuming 'user_id' is the foreign key in the customer_info table
          as: 'item_uom' // Alias, optional but useful for clarity in queries
        });
        this.belongsTo(models.customer_info, {
          foreignKey: 'suppliername',
          as: 'customer_info',
        });
        this.belongsTo(models.tax_master, {
          foreignKey: 'itmtax1code',
          as: 'tax_master_1',
        });
        this.belongsTo(models.tax_master, {
          foreignKey: 'itmtax2code',
          as: 'tax_master_2',
        });
        this.belongsTo(models.tax_master, {
          foreignKey: 'itmtax3code',
          as: 'tax_master_3',
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
    item_barcode_img: DataTypes.TEXT,
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
    itemcatname: DataTypes.BIGINT,
    itemdesclong: DataTypes.STRING(255),
    itemdesc3: DataTypes.STRING(255),
    itemdesc4: DataTypes.STRING(255),
    itemupc: DataTypes.STRING(255),
    itemref: DataTypes.STRING(255),
    stylecode: DataTypes.STRING(255),
    colorname: DataTypes.BIGINT,
    sizename: DataTypes.BIGINT,
    departname: DataTypes.BIGINT,
    familyname: DataTypes.BIGINT,
    subfamliy: DataTypes.BIGINT,
    brandname: DataTypes.BIGINT,
    hsncode: DataTypes.STRING(255),
    itemcost: DataTypes.STRING(255),
    itemprice: DataTypes.DECIMAL(18, 2),
    itemlanprice: DataTypes.DECIMAL(18, 2),
    minstklvl: DataTypes.STRING(255),
    maxstklvl: DataTypes.STRING(255),
    itmstkmgmt: DataTypes.STRING(255),
    itmuom: DataTypes.BIGINT,
    itmwweight: DataTypes.DECIMAL(18, 2),
    itmwpurunit: DataTypes.DECIMAL(18, 2),
    itmwsalesunit: DataTypes.DECIMAL(18, 2),
    itmtax1code: DataTypes.STRING(255),
    itmtax2code: DataTypes.STRING(255),
    itmtax3code: DataTypes.STRING(255),
    itmcostingmet: DataTypes.DECIMAL(18, 2),
    suppliername: DataTypes.INTEGER(11),
    note1: DataTypes.STRING(255),
    note2: DataTypes.STRING(255),
    note3: DataTypes.STRING(255),
    addedby: DataTypes.BIGINT,
    itemdesc: DataTypes.STRING(255),
    itmdt1: DataTypes.DATE,
    itmdt2: DataTypes.DATE,
    itmexpiry: DataTypes.DATE,
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