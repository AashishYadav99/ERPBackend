'use strict';
const {
    Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class invoice extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models) {
            // define association here
            this.hasMany(models.invoice_details,
                {
                    foreignKey: 'invoice_id',
                    as: 'invoice_details'
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
            this.belongsTo(models.order, {
                foreignKey: 'order_id',
                as: 'orderModel',
              });
              this.belongsTo(models.bank, {
                foreignKey: 'bank_name',
                as: 'bank'
            });
            //   this.belongsToMany(models.invoice_details, {
            //     foreignKey: 'id',
            //     otherKey: 'invoice_id',
            //     as: 'invoice_details'
            // });
        }
    } // Adjust the path as necessary

    invoice.init({
        uuid: DataTypes.CHAR(36),
        organisation_id: DataTypes.BIGINT,
        customer_id: DataTypes.BIGINT,
        depot_id: DataTypes.BIGINT,
        order_id: DataTypes.BIGINT,
        order_type_id: DataTypes.BIGINT,
        delivery_id: DataTypes.BIGINT,
        deliver_address_id: DataTypes.INTEGER,
        salesman_id: DataTypes.BIGINT,
        route_id: DataTypes.BIGINT,
        trip_id: DataTypes.BIGINT,
        invoice_type: DataTypes.ENUM('1', '2', '3', '4'),
        invoice_number: DataTypes.STRING(191),
        invoice_date: DataTypes.DATE,
        invoice_due_date: DataTypes.DATE,
        payment_term_id: DataTypes.BIGINT,
        total_qty: DataTypes.DECIMAL(18, 2),
        total_gross: DataTypes.DECIMAL(18, 2),
        total_discount_amount: DataTypes.DECIMAL(18, 2),
        total_net: DataTypes.DECIMAL(18, 2),
        total_vat: DataTypes.DECIMAL(18, 2),
        total_excise: DataTypes.DECIMAL(18, 2),
        delivery_charge: DataTypes.DECIMAL(18, 2),
        grand_total: DataTypes.DECIMAL(18, 2),
        rounding_off_amount: DataTypes.DECIMAL(8, 2),
        pending_credit: DataTypes.DECIMAL(18, 3),
        pdc_amount: DataTypes.DECIMAL(18, 3),
        is_exchange: DataTypes.TINYINT(1),
        exchange_number: DataTypes.STRING(191),
        current_stage: DataTypes.ENUM('Pending', 'Approved', 'Rejected', 'In-Process', 'Completed'),
        current_stage_comment: DataTypes.TEXT,
        approval_status: DataTypes.ENUM('Deleted', 'Created', 'Updated', 'In-Process', 'Approved'),
        is_sync: DataTypes.TINYINT(1),
        erp_id: DataTypes.TEXT,
        erp_status: DataTypes.TEXT,
        payment_received: DataTypes.TINYINT(1),
        source: DataTypes.INTEGER,
        status: DataTypes.STRING(191),
        is_premium_invoice: DataTypes.TINYINT(1),
        lob_id: DataTypes.BIGINT,
        customer_lpo: DataTypes.STRING(199),
        stamp: DataTypes.INTEGER,
        supervisor_stamp: DataTypes.INTEGER,
        supervisor_stamp_date_time: DataTypes.DATE,
        cashier_stamp: DataTypes.INTEGER,
        cashier_stamp_date_time: DataTypes.DATE,
        stamp_image: DataTypes.STRING(235),
        source_type: DataTypes.INTEGER,
        is_icash: DataTypes.INTEGER,
        is_otg: DataTypes.INTEGER,
        reason: DataTypes.STRING(191),
        is_coupon: DataTypes.INTEGER,
        invoices_post_res: DataTypes.TEXT,
        invoices_xml: DataTypes.TEXT,
        coupon_range_from: DataTypes.INTEGER,
        coupon_range_to: DataTypes.INTEGER,
        is_topup: DataTypes.INTEGER,
        is_coupon_sale: DataTypes.INTEGER,
        latitude: DataTypes.STRING(191),
        longitude: DataTypes.STRING(191),
        invoice_pdf: DataTypes.STRING(191),
        taxable_total :DataTypes.DECIMAL(18,2),
        cgst_amount :DataTypes.DECIMAL(18,2),
        sgst_amount :DataTypes.DECIMAL(18,2),
        igst_amount :DataTypes.DECIMAL(18,2),
        bank_name: DataTypes.BIGINT,
        total_discounttype :DataTypes.STRING(255),
    }, {
        sequelize,
        modelName: 'invoice',
        tableName: 'invoices',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });
    return invoice;
}
