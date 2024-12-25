const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op, Sequelize, fn, col, where } = require('sequelize');
const ResponseFormatter = require('../utils/ResponseFormatter');
const db = require('../models');
const itemModel = db.item_master;
const itemMajorCategoryModel = db.item_major_category;
const itemMainPriceModel = db.item_main_price;
const PosPaymentModel = db.pos_payment;
const {codesettingupdate} = require('../utils/handler');

require('dotenv').config();
const paths = require('path');
const base_url = process.env.BASE_URL;



const list = async (req, res, next) => {
    const { page, limit = 10 } = req.body;

    try {
        
        const currentPage = page ? parseInt(page) : 1;
        const limits = parseInt(limit);
        const offset = (currentPage - 1) * limits;
        const totalRecords = await PosPaymentModel.count();
        const festivalRes = await PosPaymentModel.findAll(
            {
            }
        );
        const totalPages = Math.ceil(totalRecords / limits);
        const pagination = {
            records: festivalRes,
            currentPage: currentPage,
            pageSize: limits,
            totalRecords: totalRecords,
            totalPages: totalPages
        };

        if (!festivalRes) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Festival not found!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', festivalRes));
        }

    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}
const store = async (req, res, next) => {
    const {
        accounting_date,
        customer_id,
        entry_reference,
        bank_id,
        currency,
        bp_amount,
        ct_val_bank_curr,
        check_number,
        total_allocated_to_bp,
        remaining_for_allocation,
        bank_amount,
        bp_account_balance
    } = req.body;

    try {
        codesettingupdate('pos_payment');
        let item = await PosPaymentModel.create({
            accounting_date: accounting_date,
            customer_id: customer_id,
            entry_reference: entry_reference,
            bank_id: bank_id,
            currency: currency,
            bp_amount: bp_amount,
            ct_val_bank_curr: ct_val_bank_curr,
            check_number: check_number,
            remaining_for_allocation: remaining_for_allocation,
            total_allocated_to_bp: total_allocated_to_bp,
            bank_amount:bank_amount,
            bp_account_balance:bp_account_balance,
        })
         
        res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Successfully Add Item', '', item));
    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}
const details = async (req, res, next) => {
    const { id } = req.body;

    try {
       
        const festivalRes = await PosPaymentModel.findOne(
            {
                where: {
                    id: id
                }
            },
        );

        if (!festivalRes) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Festival not found!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', festivalRes));
        }

    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}
const update = async (req, res, next) => {
    const {
        id,
        // accounting_date,
        customer_id,
        entry_reference,
        bank_id,
        currency,
        bp_amount,
        ct_val_bank_curr,
        check_number,
        total_allocated_to_bp,
        remaining_for_allocation,
        bank_amount,
        bp_account_balance,
    } = req.body;

    try {
        const detail = await PosPaymentModel.findOne({
            where: {
                id: id
            }
        });

        if (!detail) {
            return res.status(404).json(ResponseFormatter.setResponse(false, 404, 'item not found', 'Error'));
        }
        // codesettingupdate('item');
        let item = await PosPaymentModel.update({
            // accounting_date: accounting_date,
            customer_id: customer_id,
            entry_reference: entry_reference,
            bank_id: bank_id,
            currency: currency,
            bp_amount: bp_amount,
            ct_val_bank_curr: ct_val_bank_curr,
            check_number: check_number,
            remaining_for_allocation: remaining_for_allocation,
            total_allocated_to_bp: total_allocated_to_bp,
            bank_amount:bank_amount,
            bp_account_balance:bp_account_balance,
        },
        {
            where: {
                id: id
            }
    })
         
        res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Successfully Add item', '', detail));
    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}
const delete_pos = async (req, res, next) => {
    const { id } = req.body;

    try {
        // Attempt to soft delete the order
        const deletedCount = await PosPaymentModel.destroy({
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
};
module.exports = {

    list,
    store,
    update,
    details,
    delete_pos

};
