const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op, Sequelize, fn, col, where } = require('sequelize');
const ResponseFormatter = require('../utils/ResponseFormatter');
const db = require('../models');

const WarehouseMasterModel = db.warehouse_master;
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
        const totalRecords = await WarehouseMasterModel.count();
        const festivalRes = await WarehouseMasterModel.findAll(
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
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', pagination));
        }

    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}
const ware_list = async (req, res, next) => {
    const { page, limit = 10 } = req.body;

    try {
        
        const currentPage = page ? parseInt(page) : 1;
        const limits = parseInt(limit);
        const offset = (currentPage - 1) * limits;
        const totalRecords = await WarehouseMasterModel.count();
        const festivalRes = await WarehouseMasterModel.findAll(
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
        whcode,
        whdesc,
        whlongdesc,
        note1,
        note2,
        note3,
        locdesc,
        whnegstock,
        itmcatdt1,
        itmcatdt2,
        status,
        addedby,
    } = req.body;

    try {
        let getNumber = await codesettingGet('warehouse');
        codesettingupdate('warehouse');
        let item = await WarehouseMasterModel.create({
            whcode: getNumber,
            whdesc: whdesc,
            whlongdesc: whlongdesc,
            note1: note1,
            note2: note2,
            note3: note3,
            locdesc: locdesc,
            whnegstock: whnegstock,
            itmcatdt1: itmcatdt1,
            itmcatdt2: itmcatdt2,
            addedby: addedby,
            status: status,
        })
         
        res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Successfully Add Item', '', item));
    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}
const details = async (req, res, next) => {
    const { id } = req.body;

    try {
       
        const festivalRes = await WarehouseMasterModel.findOne(
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
        // whcode,
        whdesc,
        whlongdesc,
        note1,
        note2,
        note3,
        locdesc,
        whnegstock,
        itmcatdt1,
        itmcatdt2,
        status,
        addedby,
    } = req.body;

    try {
        const detail = await WarehouseMasterModel.findOne({
            where: {
                id: id
            }
        });

        if (!detail) {
            return res.status(404).json(ResponseFormatter.setResponse(false, 404, 'item not found', 'Error'));
        }
        // codesettingupdate('item');
        let item = await WarehouseMasterModel.update({
            // whcode: whcode,
            whdesc: whdesc,
            whlongdesc: whlongdesc,
            note1: note1,
            note2: note2,
            note3: note3,
            locdesc: locdesc,
            whnegstock: whnegstock,
            itmcatdt1: itmcatdt1,
            itmcatdt2: itmcatdt2,
            addedby: addedby,
            status: status,
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
const delete_uom = async (req, res, next) => {
    const { id } = req.body;

    try {
        // Attempt to soft delete the order
        const deletedCount = await WarehouseMasterModel.destroy({
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
    delete_uom,
    ware_list

};
