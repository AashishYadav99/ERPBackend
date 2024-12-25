require('dotenv').config();
const { Op, Sequelize, fn, col, where } = require('sequelize');
const ResponseFormatter = require('../utils/ResponseFormatter');
const db = require('../models');
// const { BankModel } = require('../models');
const BankModel = db.bank;
const CustomerInfoModel = db.customer_info;
const InvoiceModel = db.invoice;
const OrderModel = db.order;
const InventoryMovementModel = db.inventory_movement;
const InvoiceDetailModel = db.invoice_details;
const OrderDetailModel = db.order_details;
const BatchModel = db.batch;
const CustomerInfo = db.customer_info;
const SalesmanInfo = db.salesman_info;
const itemModel = db.item_master;
const paymentTermsModel = db.payment_terms;
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { Readable } = require('stream');
const itemMainPriceModel = db.item_main_price;
const itemUomModel = db.item_uom;
const UserModel = db.user_master;
const countryMastersModel = db.country_masters;
const GrnModel = db.grn;
const GrnDetailModel = db.good_receipt_note_details;
const { codesettingupdate } = require('../utils/handler');

const paths = require('path');
const base_url = process.env.BASE_URL;

const list = async (req, res, next) => {

    try {
        const bankList = await BankModel.findAll();



        if (!bankList) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'BankModel category not found!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', bankList));
        }

    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}


const store = async (req, res, next) => {
    const {
        name,
        short_name,
    } = req.body;

    try {
        // console.log('images', );
        let banks = await BankModel.create({
            name: name,
            short_name: short_name,
        })
        if (!banks) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Something went wrong!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', banks));
        }

    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}

const list_details = async (req, res, next) => {

    const { id } = req.body;
    try {

        let banks = await BankModel.findOne(
            {
                where: {
                    id: id
                },
            }
        )

        if (!banks) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Something went wrong!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', banks));
        }

    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}
const list_delete = async (req, res, next) => {

    const { id } = req.body;
    try {

        const deletedCount = await BankModel.destroy({
            where: {
                id: id
            }
        });

        if (deletedCount === 0) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Item not found!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Item deleted successfully (soft delete)!', '', { deletedCount }));
        }


    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}

const update = async (req, res, next) => {
    const {
        id,
        name,
        short_name,
    } = req.body;
    try {

        // console.log('images', );
        let banks = await BankModel.update({
            name: name,
            short_name: short_name
        }, {
            where: {
                id: id
            }
        })

        if (!banks) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Something went wrong!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', banks));
        }
    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}

module.exports = {
    list,
    store,
    list_details,
    list_delete,
    update,
};
