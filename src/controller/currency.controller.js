require('dotenv').config();
const { Op, Sequelize, fn, col, where } = require('sequelize');
const ResponseFormatter = require('../utils/ResponseFormatter');
const db = require('../models');
const { currency } = require('../models');
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
        const payment_typeList = await currency.findAll();



        if (!payment_typeList) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'currency category not found!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', payment_typeList));
        }

    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}


const store = async (req, res, next) => {
    const {
        name,
    } = req.body;

    try {
        // console.log('images', );
        let currencys = await currency.create({
            name: name,
        })

        


        if (!currencys) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Something went wrong!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', currencys));
        }

    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}

const list_details = async (req, res, next) => {

    const { id } = req.body;
    try {

        let currencys = await currency.findOne(
            {
                where: {
                    id: id
                },
            }
        )

        if (!currencys) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Something went wrong!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', currencys));
        }

    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}
const list_delete = async (req, res, next) => {

    const { id } = req.body;
    try {

        const deletedCount = await currency.destroy({
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
    } = req.body;
    try {

        // console.log('images', );
        let currencys = await currency.update({
            name: name
        }, {
            where: {
                id: id
            }
        })

        if (!currencys) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Something went wrong!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', currencys));
        }
    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}
const list_by_type = async (req, res, next) => {
    const {
        id,
        type,
    } = req.body;
    try {
        let festivalRes;
        if(type == "Payable"){
            festivalRes = await GrnModel.findAll(
                {
                    attributes: ['id','grn_number','grand_total'],
                    
                    where: {
                        payment_status:'pending'
                    },
                    order: [['id', 'DESC']],
                    // limit: limits,
                    // offset: offset
                }
            );
            for(var i = 0; i < festivalRes.length; i++){
                festivalRes[i]=festivalRes[i].toJSON()
                const grn_number = festivalRes[i].grn_number;
                        festivalRes[i].transaction_no=grn_number
            }
        }else if(type == "Receivable"){
            festivalRes = await InvoiceModel.findAll(
                {
                    where: {
                        payment_status:'pending'
                    },
                    attributes: ['id','invoice_number','grand_total'],
                    
                    order: [['id', 'ASC']],
                    // limit: limits,
                    // offset: offset
                }
            );
            for(var i = 0; i < festivalRes.length; i++){
                festivalRes[i]=festivalRes[i].toJSON()
                const trans = festivalRes[i].invoice_number;
                        festivalRes[i].transaction_no=trans
                }
        }else{
            festivalRes = await OrderModel.findAll(
                {
                    attributes: ['id','order_number','grand_total'],
                    where: { type: "sales order",status: 'Close',payment_status:'pending' },
                    order: [['id', 'DESC']],
                    // limit: limits,
                    // offset: offset
                }
            );
            for(var i = 0; i < festivalRes.length; i++){
                festivalRes[i]=festivalRes[i].toJSON()
                const trans = festivalRes[i].order_number;
                        festivalRes[i].transaction_no=trans
                }
        }

        if (!festivalRes) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Something went wrong!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', festivalRes));
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
    list_by_type,
    update,
};
