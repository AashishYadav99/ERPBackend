const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op, Sequelize, fn, col, where } = require('sequelize');
const ResponseFormatter = require('../utils/ResponseFormatter');
const db = require('../models');
const itemModel = db.item_master;
const itemMajorCategoryModel = db.item_major_category;
const itemMainPriceModel = db.item_main_price;
const itemUomModel = db.item_uom;
const {codesettingupdate} = require('../utils/handler');

require('dotenv').config();
const paths = require('path');
const base_url = process.env.BASE_URL;



const list = async (req, res, next) => {
    const { page, limit = 10 } = req.body;

    try {
        // let searchQuery;
        // if (search) {
        //     searchQuery = {
        //         [Op.or]: [
        //             where(fn('LOWER', col('sku')), 'LIKE', `%${search.toLowerCase()}%`),
        //             where(fn('LOWER', col('item_code')), 'LIKE', `%${search.toLowerCase()}%`),
        //             where(fn('LOWER', col('category')), 'LIKE', `%${search.toLowerCase()}%`)
        //         ]
        //     };
        // } else {
        //     // Initialize the array to hold individual conditions
        //     let conditions = [];

        //     if (sku) {
        //         conditions.push(where(fn('LOWER', col('sku')), 'LIKE', `%${sku.toLowerCase()}%`));
        //     }

        //     if (item_code) {
        //         conditions.push(where(fn('LOWER', col('item_code')), 'LIKE', `%${item_code.toLowerCase()}%`));
        //     }

        //     if (category) {
        //         conditions.push(where(fn('LOWER', col('category')), 'LIKE', `%${category.toLowerCase()}%`));
        //     }

        //     // Combine all conditions into the search query
        //     if (conditions.length > 0) {
        //         searchQuery = { [Op.or]: conditions };
        //     }
        // }




        // console.log('searchQuery', searchQuery);

        const currentPage = page ? parseInt(page) : 1;
        const limits = parseInt(limit);
        const offset = (currentPage - 1) * limits;
        const totalRecords = await itemUomModel.count();
        const festivalRes = await itemUomModel.findAll(
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
        upc,
        type,
        status,
        uomcode,
        uomname,
        uomdec,
        uomlong,
        unittype,
        symbol,
        note1,
        note2,
        note3,
        itmuomdt1,
        itmuomdt2,
        addedby,
    } = req.body;

    try {
        codesettingupdate('item_uoms');
        let item = await itemUomModel.create({
            upc:upc,
            type:type,
            status:status,
            uomcode:uomcode,
            uomname:uomname,
            code:uomcode,
            name:uomname,
            uomdec:uomdec,
            uomlong:uomlong,
            unittype:unittype,
            symbol:symbol,
            note1:note1,
            note2:note2,
            note3:note3,
            itmuomdt1:itmuomdt1,
            itmuomdt2:itmuomdt2,
            addedby:addedby,
        })
         
        res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Successfully Add Item', '', item));
    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}
const details = async (req, res, next) => {
    const { id } = req.body;

    try {
       
        const festivalRes = await itemUomModel.findOne(
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
        upc,
        type,
        status,
        uomcode,
        uomname,
        uomdec,
        uomlong,
        unittype,
        symbol,
        note1,
        note2,
        note3,
        itmuomdt1,
        itmuomdt2,
        addedby,
    } = req.body;

    try {
        const detail = await itemUomModel.findOne({
            where: {
                id: id
            }
        });

        if (!detail) {
            return res.status(404).json(ResponseFormatter.setResponse(false, 404, 'item not found', 'Error'));
        }
        // codesettingupdate('item');
        let item = await itemUomModel.update({
            upc:upc,
            type:type,
            status:status,
            uomcode:uomcode,
            uomname:uomname,
            // code:uomcode,
            name:uomname,
            uomdec:uomdec,
            uomlong:uomlong,
            unittype:unittype,
            symbol:symbol,
            note1:note1,
            note2:note2,
            note3:note3,
            itmuomdt1:itmuomdt1,
            itmuomdt2:itmuomdt2,
            // addedby:addedby,
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
        const deletedCount = await itemUomModel.destroy({
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
    delete_uom

};
