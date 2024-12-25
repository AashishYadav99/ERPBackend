const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op, Sequelize, fn, col, where } = require('sequelize');
const ResponseFormatter = require('../utils/ResponseFormatter');
const db = require('../models');
const itemModel = db.item_master;
const itemMajorCategoryModel = db.item_major_category;
const itemMainPriceModel = db.item_main_price;
const itemCategoryModel = db.item_category;
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
        const totalRecords = await itemCategoryModel.count();
        const festivalRes = await itemCategoryModel.findAll(
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
const cat_item_list = async (req, res, next) => {
    const {  } = req.body;

    try {
        
        
        const festivalRes = await itemCategoryModel.findAll(
            {
                include: [
                    {
                        model: itemModel,
                        as: 'item_master',
                    },
                    
                ],
            }
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
const store = async (req, res, next) => {
    const {
        itemcatcode,
        itemcatname,
        itemdesclong,
        abcgroup,
        stockmgmt,
        note1,
        note2,
        note3,
        itmcatdt1,
        itmcatdt2,
        negativestock,
        status,
        addedby,
    } = req.body;

    try {
        codesettingupdate('item_category');
        
        let item = await itemCategoryModel.create({
            itemcatcode: itemcatcode,
            itemcatname: itemcatname,
            itemdesclong: itemdesclong,
            abcgroup: abcgroup,
            stockmgmt: stockmgmt,
            note1: note1,
            note2: note2,
            note3: note3,
            itmcatdt1: itmcatdt1,
            itmcatdt2: itmcatdt2,
            negativestock: negativestock,
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
       
        const festivalRes = await itemCategoryModel.findOne(
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
        // itemcatcode,
        itemcatname,
        itemdesclong,
        abcgroup,
        stockmgmt,
        note1,
        note2,
        note3,
        itmcatdt1,
        itmcatdt2,
        negativestock,
        status,
        addedby,
    } = req.body;

    try {
        const detail = await itemCategoryModel.findOne({
            where: {
                id: id
            }
        });

        if (!detail) {
            return res.status(404).json(ResponseFormatter.setResponse(false, 404, 'item not found', 'Error'));
        }
        // codesettingupdate('item');
        let item = await itemCategoryModel.update({
            // itemcatcode: itemcatcode,
            itemcatname: itemcatname,
            itemdesclong: itemdesclong,
            abcgroup: abcgroup,
            stockmgmt: stockmgmt,
            note1: note1,
            note2: note2,
            note3: note3,
            itmcatdt1: itmcatdt1,
            itmcatdt2: itmcatdt2,
            negativestock: negativestock,
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
const delete_item_category = async (req, res, next) => {
    const { id } = req.body;

    try {
        // Attempt to soft delete the order
        const deletedCount = await itemCategoryModel.destroy({
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
    cat_item_list,
    delete_item_category

};
