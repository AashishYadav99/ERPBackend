const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op, Sequelize, fn, col, where } = require('sequelize');
const ResponseFormatter = require('../utils/ResponseFormatter');
const db = require('../models');
const itemModel = db.item_master;
const itemMajorCategoryModel = db.item_major_category;
const itemMainPriceModel = db.item_main_price;
const itemUomModel = db.item_uom;
const { codesettingupdate } = require('../utils/handler');

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
        const totalRecords = await itemModel.count();
        const festivalRes = await itemModel.findAll(
            {
                include: [
                    {
                        model: itemMajorCategoryModel,
                        as: 'itemcategory',
                        attributes: ['name'],
                    },
                    {
                        model: itemMainPriceModel,
                        as: 'item_main_prices',
                        attributes: ['id', 'item_id', 'item_uom_id', 'item_price'],
                        include: [
                            {
                                model: itemUomModel,
                                as: 'item_uom',
                                attributes: ['id', 'code', 'name'],
                            }
                        ]
                    },

                ],
                order: [['id', 'DESC']],
            },
        );

        // console.log("Base URL:", process.env.BASE_URL);
        // if (festivalRes.length > 0) {
        //     for (const item of festivalRes) {
        //         if (item.barcode && (item.barcode !== "")) {
        //             let new_url = base_url + item.barcode.replace(/^.*?([A-Za-z]:[\/\\])/g, '');
        //             let final_url = new_url.replace(/\\/g, "/");
        //             item.barcode = final_url.replace("file-read-mysql/public/", "");
        //         }
        //     }
        // }
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
        price,
        code,
        name,
        uom,
        tax,
        stock,
        partNumber,
        barcode,
        rate

        // item_major_category_id,
        // item_group_id,
        // brand_id,
        // is_product_catalog,
        // is_promotional,
        // erp_code,
        // item_description,
        // item_barcode,
        // item_weight,
        // item_shelf_life,
        // volume,
        // lower_unit_uom_id,
        // is_tax_apply,
        // lower_unit_item_upc,
        // lower_unit_item_price,
        // lower_unit_purchase_order_price,
        // stock_keeping_unit,
        // unit_item_max_price,
        // item_excise,
        // new_lunch,
        // is_variant,
        // start_date,
        // end_date,
        // supervisor_category_id,
        // current_stage,
        // current_stage_comment,
        // status,
        // lob_id,
        // is_coupon,
        // is_promo_allocation,
        // coupon_id,
        // item_main_price
    } = req.body;

    try {
        codesettingupdate('item');
        // const newStr = req.file.path.replace('public/', '');
        let item = await itemModel.create({
            item_code: code,
            item_name: name,
            item_vat_percentage: price,
            item_tax:tax,
            stock:stock,
            // item_image: newStr,
            partNumber:partNumber,
            barcode: barcode,
            rate:rate,

            // item_major_category_id: item_major_category_id,
            // item_group_id: item_group_id,
            // brand_id: brand_id,
            // is_product_catalog: is_product_catalog ? 1 : 0,
            // is_promotional: is_promotional ? 1 : 0,
            // erp_code: erp_code,
            // item_description: item_description,
            // item_barcode: item_barcode,
            // item_weight: item_weight,
            // item_shelf_life: item_shelf_life,
            // volume: volume,
            // lower_unit_uom_id: lower_unit_uom_id,
            // is_tax_apply: is_tax_apply,
            // lower_unit_item_upc: lower_unit_item_upc,
            // lower_unit_item_price: lower_unit_item_price,
            // lower_unit_purchase_order_price: lower_unit_purchase_order_price,
            // stock_keeping_unit: stock_keeping_unit ? 1 : 0,
            // unit_item_max_price: unit_item_max_price ? unit_item_max_price : 0,
            // // secondary_stock_keeping_unit : secondary_stock_keeping_unit ? 1 : 0,
            // item_excise: item_excise,

            // new_lunch: new_lunch ? 1 : 0,
            // is_variant: is_variant ? 1 : 0,
            // start_date: start_date,
            // end_date: end_date,
            // supervisor_category_id: supervisor_category_id ,

            // current_stage: current_stage,
            // current_stage_comment: current_stage_comment,
            // status: status,
            // // lob_id :  (!empty(lob_id)) ? lob_id : null,
            // lob_id: lob_id,

            // is_coupon: is_coupon,
            // is_promo_allocation: is_promo_allocation,
            // coupon_id: coupon_id,
        })

        
                let item_main_prices = await itemMainPriceModel.create({
                    //save Main Price
                    item_id: item.id,
                    item_uom_id: uom,
                    // item_upc: item_main_price[i].item_upc,
                    // item_price: item_main_price[i].item_price,
                    // purchase_order_price: item_main_price[i].purchase_order_price,
                    // stock_keeping_unit: item_main_price[i].stock_keeping_unit ? 1 : 0,
                    // status: item_main_price[i].status,
                    // item_main_max_price: item_main_price[i].item_main_max_price ? 1 : 0,
                    // uom_barcode: item_main_price[i].uom_barcode,
                    // uom_cost: item_main_price[i].uom_cost,
                    // sell_enable: item_main_price[i].sell_enable ? item_main_price[i].sell_enable : 0,
                    // return_enable: item_main_price[i].return_enable ? item_main_price[i].return_enable : 0,
                    // uom_type: uom_type,
                    // uom_type
                });
         
        res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Successfully Add Item', '', item));
    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}
const details = async (req, res, next) => {
    const { id } = req.body;

    try {
       
        const festivalRes = await itemModel.findOne(
            {
                include: [
                    {
                        model: itemMajorCategoryModel,
                        as: 'itemcategory',
                        attributes: ['name'],
                    },
                    {
                        model: itemMainPriceModel,
                        as: 'item_main_prices',
                        attributes: ['id', 'item_id', 'item_uom_id', 'item_price'],
                        include: [
                            {
                                model: itemUomModel,
                                as: 'item_uom',
                                attributes: ['id', 'code', 'name'],
                            }
                        ]
                    },

                ],
                where: {
                    id: id
                }
            },
        );

        // console.log("Base URL:", process.env.BASE_URL);
        
        // if (festivalRes.barcode && (festivalRes.barcode !== "")) {
        //     let new_url = base_url + festivalRes.barcode.replace(/^.*?([A-Za-z]:[\/\\])/g, '');
        //     let final_url = new_url.replace(/\\/g, "/");
        //     festivalRes.barcode = final_url.replace("file-read-mysql/public/", "");
        // }

        if (!festivalRes) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Festival not found!', 'Error', ''));
        } else {
            festivalRes.item_image =base_url + festivalRes.item_image;
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', festivalRes));
        }

    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}
const update = async (req, res, next) => {
    const {
        id,
        price,
        code,
        name,
        uom,
        tax,
        stock,
        partNumber,
        barcode,
        rate
        // item_major_category_id,
        // item_group_id,
        // brand_id,
        // is_product_catalog,
        // is_promotional,
        // item_code,
        // erp_code,
        // item_name,
        // item_description,
        // item_barcode,
        // item_weight,
        // item_shelf_life,
        // volume,
        // lower_unit_uom_id,
        // is_tax_apply,
        // lower_unit_item_upc,
        // lower_unit_item_price,
        // lower_unit_purchase_order_price,
        // item_vat_percentage,
        // stock_keeping_unit,
        // unit_item_max_price,
        // item_excise,
        // new_lunch,
        // is_variant,
        // start_date,
        // end_date,
        // supervisor_category_id,
        // current_stage,
        // current_stage_comment,
        // status,
        // lob_id,
        // is_coupon,
        // is_promo_allocation,
        // coupon_id,
        // item_main_price
    } = req.body;

    try {
        const detail = await itemModel.findOne({
            where: {
                id: id
            }
        });

        if (!detail) {
            return res.status(404).json(ResponseFormatter.setResponse(false, 404, 'item not found', 'Error'));
        }
        // codesettingupdate('item');
        // let newStr;
        // if(req.file){
        //     newStr = req.file.path.replace('public/', '');
        // }else{
        //     newStr = detail.item_image
        // }
        
        let item = await itemModel.update({

            item_code: code,
            item_name: name,
            item_vat_percentage: price,
            item_tax:tax,
            stock:stock,
            // item_image: newStr,
            partNumber:partNumber,
            barcode: barcode,
            rate:rate
            // item_major_category_id: item_major_category_id,
            // item_group_id: item_group_id,
            // brand_id: brand_id,
            // is_product_catalog: is_product_catalog ? 1 : 0,
            // is_promotional: is_promotional ? 1 : 0,
            // item_code: item_code,
            // erp_code: erp_code,
            // item_name: item_name,
            // item_description: item_description,
            // item_barcode: item_barcode,
            // item_weight: item_weight,
            // item_shelf_life: item_shelf_life,
            // volume: volume,
            // lower_unit_uom_id: lower_unit_uom_id,
            // is_tax_apply: is_tax_apply,
            // lower_unit_item_upc: lower_unit_item_upc,
            // lower_unit_item_price: lower_unit_item_price,
            // lower_unit_purchase_order_price: lower_unit_purchase_order_price,
            // item_vat_percentage: item_vat_percentage,
            // stock_keeping_unit: stock_keeping_unit ? 1 : 0,
            // unit_item_max_price: unit_item_max_price ? unit_item_max_price : 0,
            // // secondary_stock_keeping_unit : secondary_stock_keeping_unit ? 1 : 0,
            // item_excise: item_excise,

            // new_lunch: new_lunch ? 1 : 0,
            // is_variant: is_variant ? 1 : 0,
            // start_date: start_date,
            // end_date: end_date,
            // supervisor_category_id: supervisor_category_id ,

            // current_stage: current_stage,
            // current_stage_comment: current_stage_comment,
            // status: status,
            // // lob_id :  (!empty(lob_id)) ? lob_id : null,
            // lob_id: lob_id,

            // is_coupon: is_coupon,
            // is_promo_allocation: is_promo_allocation,
            // coupon_id: coupon_id,
        },
        {
            where: {
                id: id
            }
    })

        if (uom !="") {
            const deletedCount = await itemMainPriceModel.destroy({
                where: {
                    item_id: id
                }
            });
            let item_main_prices = await itemMainPriceModel.create({
                //save Main Price
                item_id:id,
                item_uom_id: uom,
                // item_upc: item_main_price[i].item_upc,
                // item_price: item_main_price[i].item_price,
                // purchase_order_price: item_main_price[i].purchase_order_price,
                // stock_keeping_unit: item_main_price[i].stock_keeping_unit ? 1 : 0,
                // status: item_main_price[i].status,
                // item_main_max_price: item_main_price[i].item_main_max_price ? 1 : 0,
                // uom_barcode: item_main_price[i].uom_barcode,
                // uom_cost: item_main_price[i].uom_cost,
                // sell_enable: item_main_price[i].sell_enable ? item_main_price[i].sell_enable : 0,
                // return_enable: item_main_price[i].return_enable ? item_main_price[i].return_enable : 0,
                // uom_type: uom_type,
                // uom_type
            });
        }
         
        res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Successfully Add item', '', detail));
    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}
const delete_item = async (req, res, next) => {
    const { id } = req.body;

    try {
        // Attempt to soft delete the order
        const deletedCount = await itemModel.destroy({
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
    delete_item

};
