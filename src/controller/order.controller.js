const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op, Sequelize, fn, col, where, FLOAT } = require('sequelize');
const ResponseFormatter = require('../utils/ResponseFormatter');
const db = require('../models');
const OrderModel = db.order;
const BatchModel = db.batch;
const OrderDetailModel = db.order_details;
const UserModel = db.user_master;
const CustomerInfo = db.customer_info;
const SalesmanInfo = db.salesman_info;
const itemModel = db.item_master;
const invoiceModel = db.invoice;
const paymentTermsModel = db.payment_terms;
const itemMainPriceModel = db.item_main_price;
const itemUomModel = db.item_uom;
const countryMastersModel = db.country_masters;

const { codesettingupdate } = require('../utils/handler');

require('dotenv').config();
const paths = require('path');
const base_url = process.env.BASE_URL;



const list = async (req, res, next) => {
    const { page, name, customer_code, limit = 10 } = req.body;

    try {
        // let searchQuery;

        //     // Initialize the array to hold individual conditions
        //     let conditions = [];

        //     if (customer_code) {
        //         conditions.push({
        //             customer_code: { [Op.eq]: customer_code }
        //         });
        //     }
        //     if (name) {
        //         conditions.push({
        //             [Op.or]: [
        //                 { '$users.firstname$': { [Op.iLike]: `%${name}%` } },
        //                 { '$users.lastname$': { [Op.iLike]: `%${name}%` } }
        //             ]
        //         });
        //     }

        //     // Combine all conditions into the search query
        //     if (conditions.length > 0) {
        //         searchQuery = { [Op.or]: conditions };
        //     }





        // console.log('searchQuery', searchQuery);

        const currentPage = page ? parseInt(page) : 1;
        const limits = parseInt(limit);
        const offset = (currentPage - 1) * limits;
        const totalRecords = await OrderModel.count();
        const festivalRes = await OrderModel.findAll(
            {
                //     where: searchQuery,
                // attributes: ['id','customer_code','customer_id'],
                include: [
                    {
                        model: UserModel,
                        as: 'salesman',
                        attributes: ['firstname', 'lastname', 'email', 'id'],
                        include: [
                            {
                                model: SalesmanInfo,
                                as: 'salesmanInfo',
                                attributes: ['salesman_code', 'user_id'] // Example attributes
                            }
                        ]

                    },
                    {
                        model: UserModel,
                        as: 'customer',
                        attributes: ['firstname', 'lastname', 'email', 'id'],
                        include: [
                            {
                                model: CustomerInfo,
                                as: 'customerInfo',
                                attributes: ['customer_code', 'user_id'] // Example attributes
                            }
                        ]
                    },
                    {
                        model: OrderDetailModel,
                        as: 'order_details',
                        // attributes: ['firstname', 'lastname', 'email'],
                    },
                    {
                        model: invoiceModel,
                        as: 'invoice',
                        attributes: ['invoice_number'],
                        required: false
                    },
                ],
                where: { type: "sales order" },
                order: [['id', 'DESC']],
                // limit: limits,
                // offset: offset
            }
        );

        // console.log("Base URL:", process.env.BASE_URL);
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

const store = async (req, res, next) => {
    const {
        customer_id,
        customer_lob,
        salesman_id,
        customer_lpo,
        order_number,
        delivery_date,
        payment_terms,
        due_date,
        discount,
        net,
        excise,
        vat,
        total,
        // status,
        order_type,
        taxable_total,
        cgst_amount,
        sgst_amount,
        igst_amount,
        items,
        type,
    } = req.body;

    try {
        codesettingupdate('order');
        let date = new Date();
        let Order = await OrderModel.create({
            customer_id: customer_id,
            customer_lob: customer_lob,
            salesman_id: salesman_id,
            customer_lop: customer_lpo,
            order_number: order_number,
            delivery_date: delivery_date,
            order_date: date,
            payment_term_id: payment_terms,
            due_date: due_date,
            total_discount_amount: discount,
            total_net: net,
            total_vat: vat,
            total_excise: excise,
            grand_total: total,
            taxable_total: taxable_total,
            cgst_amount: cgst_amount,
            sgst_amount: sgst_amount,
            igst_amount: igst_amount,
            status: 'Open',
            order_type: order_type,
            type: type,
        })


        for (var i = 0; i < items.length; i++) {
            let is_free = 0;
            if (items[i].skim == "Free") {
                is_free = 1;
            }

            let item_stoke=await itemModel.findOne({
                where: {
                    id: items[i].item_id
                }
            });

            let OrderDetail = await OrderDetailModel.create({
                order_id: Order.id,
                item_id: items[i].item_id,
                item_uom_id: items[i].uom,
                discount_id: 0,
                is_free: is_free,
                is_item_poi: 0,
                promotion_id: 0,
                item_qty: items[i].quantity,
                item_weight: 0,
                total_pallet: 0,
                total_pallet_volume: 0,
                item_price: items[i].price,
                item_gross: items[i].price,
                item_discount_amount: items[i].discount,
                item_net: items[i].net,
                item_vat: items[i].vat,
                item_excise: items[i].excise,
                item_grand_total: items[i].total,
                delivered_qty: 0,
                open_qty: 0,
                order_status: 'Pending',
                ptr_di: items[i].ptr_di,
                taxa_ble: items[i].taxa_ble,
                cgst: items[i].cgst,
                cgst_amount: items[i].sgst,
                sgst: items[i].sgst,
                sgst_amount: items[i].sgst_amount,
                igst: items[i].igst,
                igst_amount: items[i].igst_amount,
                discounttype: items[i].discounttype,
                expiry_delivery_date : item_stoke.exp_date,
                receiving_site : item_stoke.batch_no,
                hsn_code : item_stoke.short_code,
            })
        }

        res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Successfully Add Order', '', Order));
    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}
const details = async (req, res, next) => {
    const { id } = req.body;

    try {
        const detail = await OrderModel.findOne({
            include: [
                {
                    model: UserModel,
                    as: 'salesman',
                    attributes: ['firstname', 'lastname', 'email', 'id', 'mobile'],
                    include: [
                        {
                            model: SalesmanInfo,
                            as: 'salesmanInfo',
                            attributes: ['salesman_code', 'user_id'] // Example attributes
                        }
                    ]

                },
                {
                    model: UserModel,
                    as: 'customer',
                    attributes: ['firstname', 'lastname', 'email', 'id', 'mobile', 'country_id','custax1'],
                    include: [
                        {
                            model: CustomerInfo,
                            as: 'customerInfo',
                            attributes: ['customer_code', 'user_id', 'customer_address_1', 'customer_address_2','msme_no','fssai_no','state_code'], // Example attributes

                        },
                        {
                            model: countryMastersModel,
                            as: 'country',    // The associated User model
                            attributes: ['id', 'name'],
                        }
                    ]
                },
                {
                    model: OrderDetailModel,
                    as: 'order_details',
                    include: [
                        {
                            model: itemModel,
                            as: 'itemModel',
                            include: [{
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
                            }],
                        },
                    ]
                    // attributes: ['firstname', 'lastname', 'email'],
                },
                {
                    model: paymentTermsModel,
                    as: 'payment_terms',
                    attributes: ['id', 'name'],
                },

                {
                    model: invoiceModel,
                    as: 'invoice',
                    attributes: ['invoice_number'],
                    required: false
                },
            ],
            where: {
                id: id
            }
        });

        if (!detail) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Order not found!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Order retrive successfully!', '', detail));
        }

    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}
// const UpdateOrder = async (req, res, next) => {
//     const {
//         id,
//         // customer_id,
//         customer_lob,
//         // salesman_id,
//         customer_lpo,
//         // order_number,
//         delivery_date,
//         payment_terms,
//         due_date,
//         discount,
//         net,
//         excise,
//         vat,
//         total,
//         status,
//         order_type,
//         items,
//      } = req.body;

//     try {
//         const detail = await OrderModel.findOne({
//             include: [
//                 {
//                     model: OrderDetailModel,
//                     as: 'order_details',
//                     // attributes: ['firstname', 'lastname', 'email'],
//                 },
//             ],
//             where: {
//                 id: id
//             }
//         });
//         codesettingupdate('order');
//         let Order = await OrderModel.update({
//             where: {
//                 id: id
//             },
//             // customer_id:customer_id,
//             customer_lob:customer_lob,
//             // salesman_id:salesman_id,
//             customer_lpo:customer_lpo,
//             // order_number:order_number,
//             delivery_date:delivery_date,
//             payment_terms:payment_terms,
//             due_date:due_date,
//             total_discount_amount:discount,
//             total_net:net,
//             total_vat:vat,
//             total_excise:excise,
//             grand_total:total,
//             status:status,
//             order_type:order_type,
//         })


//         for(var i = 0; i < items.length; i++){
//             let OrderDetail = await OrderDetailModel.create({
//                 order_id:Order.id,
//                 item_id: items[i].item_id,
//                 item_uom_id: 0,
//                 discount_id: 0,
//                 is_free : 0,
//                 is_item_poi : 0,
//                 promotion_id : 0,
//                 item_qty: items[i].quantity,
//                 item_weight: 0,
//                 total_pallet: 0,
//                 total_pallet_volume: 0,
//                 item_price: 0,
//                 item_gross : items[i].price,
//                 item_discount_amount : items[i].discount,
//                 item_net : items[i].net,
//                 item_vat: items[i].vat,
//                 item_excise: items[i].excise,
//                 item_grand_total : items[i].total,
//                 delivered_qty : 0,
//                 open_qty :0,
//                 order_status: 'Pending',       
//             })
//         }

//         res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Successfully Add Order', '', Order));
//     } catch (error) {
//         res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
//     }
// }
const UpdateOrder = async (req, res, next) => {
    const {
        id,
        customer_lob,
        customer_lpo,
        delivery_date,
        payment_terms,
        due_date,
        discount,
        net,
        excise,
        vat,
        total,
        status,
        order_type,
        type,
        items,
    } = req.body;

    try {
        // Find the existing order and its details
        const detail = await OrderModel.findOne({
            include: [
                {
                    model: OrderDetailModel,
                    as: 'order_details',
                },
            ],
            where: {
                id: id
            }
        });

        if (!detail) {
            return res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Order not found', 'Error'));
        }

        // Update the order details
        await OrderModel.update({
            customer_lob: customer_lob,
            customer_lop: customer_lpo,
            delivery_date: delivery_date,
            payment_term_id: payment_terms,
            due_date: due_date,
            total_discount_amount: discount,
            total_net: net,
            total_vat: vat,
            total_excise: excise,
            grand_total: total,
            status: status,
            order_type: order_type,
            type: type,
        }, {
            where: {
                id: id
            }
        });

        // Process each item in the order
        for (let i = 0; i < items.length; i++) {
            const existingItem = detail.order_details.find(orderDetail => orderDetail.item_id === items[i].item_id && items[i].order_details_id && orderDetail.id);
            let item_stoke=await itemModel.findOne({
                where: {
                    id: items[i].item_id
                }
            });
            // if(existingItem.item_qty != items[i].quantity){
            //     let batch = await BatchModel.findOne({
            //         where: {
            //             item_id: items[i].item_id,
            //             qty: { [Op.gt]: 0 } // Ensure there's stock available
            //         },
            //         order: [['expiry_date', 'ASC']] // Sort by nearest expiry date
            //     });
            //     let totalToOrder = parseInt(items[i].quantity);
            //     let remainingToOrder = totalToOrder;

            //     for (const batchRecord of batch) {
            //         if (remainingToOrder <= 0) break; // Stop if order is fulfilled

            //         const availableQty = batchRecord.qty;
                    
            //         if (availableQty > 0) {
            //             // Determine how much to take from this batch
            //             const qtyToTake = Math.min(availableQty, remainingToOrder);

            //             // Update the batch record or perform necessary actions
            //             batchRecord.qty -= qtyToTake; // Reduce the qty in the batch
            //             remainingToOrder -= qtyToTake; // Reduce the remaining qty to order
            //         }
            //     }
            //     // let stoke_final = parseInt(batch.qty) - parseInt(items[i].quantity); 
            //     // await BatchModel.update({ qty: stoke_final }, { where: { item_id: items[i].item_id } });
                
            // }
            if (existingItem) {
                // If the item already exists, update the quantity and other details
                await OrderDetailModel.update({
                    item_qty: parseFloat(existingItem.item_qty),
                    item_uom_id: items[i].uom,
                    item_price: items[i].price,
                    item_gross: items[i].price,
                    item_discount_amount: items[i].discount,
                    item_net: items[i].net,
                    item_vat: items[i].vat,
                    item_excise: items[i].excise,
                    item_grand_total: items[i].total,
                    discounttype: items[i].discounttype,
                    taxa_ble :items[i].taxa_ble,
                    expiry_delivery_date : item_stoke.exp_date,
                    receiving_site : item_stoke.batch_no,
                    hsn_code : item_stoke.short_code,
                }, {
                    where: {
                        id: items[i].order_details_id
                    }
                });
            } else {
                // If the item does not exist, create a new order detail
                await OrderDetailModel.create({
                    order_id: id,
                    item_id: items[i].item_id,
                    item_uom_id: 0,
                    discount_id: 0,
                    is_free: 0,
                    is_item_poi: 0,
                    promotion_id: 0,
                    item_qty: items[i].quantity,
                    item_weight: 0,
                    total_pallet: 0,
                    total_pallet_volume: 0,
                    item_price: items[i].price,
                    item_gross: items[i].price,
                    item_discount_amount: items[i].discount,
                    item_net: items[i].net,
                    item_vat: items[i].vat,
                    item_excise: items[i].excise,
                    item_grand_total: items[i].total,
                    discounttype: items[i].discounttype,
                    delivered_qty: 0,
                    open_qty: 0,
                    order_status: 'Pending',
                    expiry_delivery_date : item_stoke.exp_date,
                    receiving_site : item_stoke.batch_no,
                    hsn_code : item_stoke.short_code,
                });
            }
        }

        res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Successfully updated Order', '', detail));
    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}

const delete_order = async (req, res, next) => {
    const { id } = req.body;

    try {
        // Attempt to soft delete the order
        const deletedCount = await OrderModel.destroy({
            where: {
                id: id
            }
        });

        if (deletedCount === 0) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Order not found!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Order deleted successfully (soft delete)!', '', { deletedCount }));
        }

    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
};


module.exports = {

    list,
    store,
    UpdateOrder,
    details,
    delete_order
};
