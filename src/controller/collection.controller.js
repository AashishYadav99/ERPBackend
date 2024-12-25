const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op, Sequelize, fn, col, where, FLOAT } = require('sequelize');
const ResponseFormatter = require('../utils/ResponseFormatter');
const db = require('../models');
const CollectionModel = db.collection;
const BankModel = db.bank;
const PaymentTypeModel = db.payment_type;
const InvoiceModel = db.invoice;
const GrnModel = db.grn;
const OrderModel = db.order;
const InventoryMovementModel = db.inventory_movement;
const CollectionDetailModel = db.collection_details;
const OrderDetailModel = db.order_details;
const UserModel = db.user_master;
const BatchModel = db.batch;
const CustomerInfo = db.customer_info;
const SalesmanInfo = db.salesman_info;
const itemModel = db.item_master;
const paymentTermsModel = db.payment_terms;
const itemMainPriceModel = db.item_main_price;
const itemUomModel = db.item_uom;
const countryMastersModel = db.country_masters;
const { codesettingupdate, codesettingGet } = require('../utils/handler');
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
        const totalRecords = await CollectionModel.count();
        const festivalRes = await CollectionModel.findAll(
            {

                // attributes: ['id', 'type', 'payemnt_type', 'customer_id', 'collection_date', 'collection_number', 'bank_num', 'cheque_number', 'bank_info', 'total'],
                include: [
                    {
                        model: UserModel,
                        as: 'salesman',
                        attributes: ['firstname', 'lastname', 'email'],
                        include: [
                            {
                                model: SalesmanInfo,
                                as: 'salesmanInfo',
                                attributes: ['salesman_code'] // Example attributes
                            }
                        ]

                    },
                    {
                        model: UserModel,
                        as: 'customer',
                        attributes: ['firstname', 'lastname', 'email'],
                        include: [
                            {
                                model: CustomerInfo,
                                as: 'customerInfo',
                                attributes: ['customer_code'] // Example attributes
                            }
                        ]
                    },
                    {
                        model: CollectionDetailModel,
                        as: 'collection_details',
                        // attributes: ['firstname', 'lastname', 'email'],
                    },
                    {
                        model: PaymentTypeModel,
                        as: 'payment_types',
                    },
                    {
                        model: BankModel,
                        as: 'bank',
                    },
                ],
                order: [['id', 'DESC']],
                // limit: limits,
                // offset: offset
            }
        );
        // for(var i = 0; i < festivalRes.length; i++){
        // const collectionPdfFullPaths = festivalRes[i].collection_pdf
        //         ? base_url + path.posix.join('uploads/collections', festivalRes[i].collection_pdf)
        //         : null;
        //         festivalRes[i].collection_pdf=collectionPdfFullPaths
        // }
        // // console.log("Base URL:", process.env.BASE_URL);
        const totalPages = Math.ceil(totalRecords / limits);
        const pagination = {
            records: festivalRes,
            currentPage: currentPage,
            pageSize: limits,
            totalRecords: totalRecords,
            totalPages: totalPages
        };

        if (!festivalRes) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Collection not found!', 'Error', ''));
        } else {
            for (var i = 0; i < festivalRes.length; i++) {
                festivalRes[i] = festivalRes[i].toJSON();
                if (festivalRes[i].payment_type == 1) {
                    let detail = await GrnModel.findOne({
                        attributes: ['id', 'grn_number'],
                        where: {
                            id: festivalRes[i].transaction_no
                        }
                    });
                    detail = detail.toJSON();
                    detail.transaction_num = detail.grn_number;
                    festivalRes[i].transaction = detail;
                } else if (festivalRes[i].payment_type == 2) {
                    let detail = await InvoiceModel.findOne({
                        attributes: ['id', 'invoice_number'],
                        where: {
                            id: festivalRes[i].transaction_no
                        }
                    });
                    detail = detail.toJSON();
                    detail.transaction_num = detail.invoice_number;
                    festivalRes[i].transaction = detail;
                } else {
                    let detail = await OrderModel.findOne({
                        attributes: ['id', 'order_number'],
                        where: {
                            id: festivalRes[i].transaction_no
                        }
                    });
                    detail = detail.toJSON();
                    detail.transaction_num = detail.order_number;
                    festivalRes[i].transaction = detail;
                }

                let collection_details = festivalRes[i].collection_details;
                let collection_pay_amount = 0;
                for (var h = 0; h < collection_details.length; h++) {
                    collection_pay_amount = collection_pay_amount + parseInt(collection_details[h].amount);
                    // collection_details[i]=collection_details[i].toJSON();
                    if (collection_details[h].payment_mode == "check_type") {

                        let details = await BankModel.findOne({
                            // attributes: ['id','order_number'],
                            where: {
                                id: collection_details[h].type
                            }
                        });
                        collection_details[h].bank = details;
                    }

                }
                festivalRes[i].pay_amount = collection_pay_amount;
                festivalRes[i].balance_amount = festivalRes[i].total_payment_amount - collection_pay_amount;
            }
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', pagination));
        }

    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}

const store = async (req, res, next) => {
    const {
        // type,
        // customer_id,
        // payment_type,
        // date,
        // bank_num,
        // check_num,
        // bankname,
        // total,
        items,
        payment_no,
        balance_amount,
        payment_mode,
        date,
        transaction_no,
        approved_by,
        payment_type,
        cash,
        bankname,
        voucher,
        credit_card,
        pay_account_no,
        pay_branch_location,
        total_payment_amount,
        note1,
        note2,
        note3,
        itmtaxdt1,
        itmtaxdt2,
        status,
        addedby,
    } = req.body;

    // try {
    let getcollectionNumber = await codesettingGet('collection');
    codesettingupdate('collection');


    let Collection = await CollectionModel.create({

        // type: type,
        // customer_id: customer_id,
        // payemnt_type: payment_type,
        collection_number: getcollectionNumber,
        collection_date: date,
        // bank_num: bank_num,
        // cheque_number: check_num,
        // bank_info: bankname,
        // total: total,

        payment_no: payment_no,
        balance_amount: balance_amount,
        payment_mode: payment_mode,
        date: date,
        transaction_no: transaction_no,
        approved_by: approved_by,
        payment_type: payment_type,
        cash: cash,
        bankname: bankname,
        voucher: voucher,
        credit_card: credit_card,
        pay_account_no: pay_account_no,
        pay_branch_location: pay_branch_location,
        total_payment_amount: total_payment_amount,
        note1: note1,
        note2: note2,
        note3: note3,
        itmtaxdt1: itmtaxdt1,
        itmtaxdt2: itmtaxdt2,
        status: status,
        addedby: addedby,
        collection_status: 'Pending'
    })


    for (var i = 0; i < items.length; i++) {
        let CollectionDetail = await CollectionDetailModel.create({
            collection_id: Collection.id,
            payment_mode: items[i].payment_mode,
            type: items[i].type,
            amount: items[i].amount,

        });

    }
    if (payment_type == 1) {
        // let detail = await GrnModel.findOne({
        //     attributes: ['id','grn_number'],
        //     where: {
        //         id: transaction_no
        //     }
        // });


        await GrnModel.update({
            status: "completed",
        }, {
            where: {
                id: transaction_no
            }
        });

    } else if (payment_type == 2) {
        // let detail = await InvoiceModel.findOne({
        //     attributes: ['id','invoice_number'],
        //     where: {
        //         id: transaction_no
        //     }
        // });

        await InvoiceModel.update({
            status: "completed",
        }, {
            where: {
                id: transaction_no
            }
        });

    } else {
        // let detail = await OrderModel.findOne({
        //     attributes: ['id','order_number'],
        //     where: {
        //         id: transaction_no
        //     }
        // });

        await OrderModel.update({
            status: "completed",
        }, {
            where: {
                id: transaction_no
            }
        });
    }
    res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Successfully Collection Create', '', Collection));
    // } catch (error) {
    //     res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    // }
}
const details = async (req, res, next) => {
    const { id } = req.body;

    try {
        let detail = await CollectionModel.findOne({
            // attributes: [
            //     'id', 'type', 'payemnt_type', 'total', 'customer_id',
            //     'collection_date', 'collection_number', 'bank_num',
            //     'cheque_number', 'bank_info', 'total'
            // ],
            include: [
                {
                    model: UserModel,
                    as: 'salesman',
                    attributes: ['firstname', 'lastname', 'email', 'mobile'],
                    include: [
                        {
                            model: SalesmanInfo,
                            as: 'salesmanInfo',
                            attributes: ['salesman_code']
                        }
                    ]
                },
                {
                    model: UserModel,
                    as: 'customer',
                    attributes: ['firstname', 'lastname', 'email', 'mobile', 'country_id', 'custax1'],
                    include: [
                        {
                            model: CustomerInfo,
                            as: 'customerInfo',
                            attributes: ['customer_code', 'customer_address_1', 'customer_address_2', 'msme_no', 'fssai_no', 'state_code'],
                        },
                        {
                            model: countryMastersModel,
                            as: 'country',
                            attributes: ['id', 'name'],
                        }
                    ]
                },
                {
                    model: CollectionDetailModel,
                    as: 'collection_details',
                    include: [
                        {
                            model: InvoiceModel,
                            as: 'invoiceModel',
                            attributes: ['id', 'invoice_number'],
                        },
                        {
                            model: GrnModel,
                            as: 'GrnModel',
                            attributes: ['id', 'grn_number'],
                        }
                    ]
                },
                {
                    model: PaymentTypeModel,
                    as: 'payment_types',
                },
                {
                    model: BankModel,
                    as: 'bank',
                },
            ],
            where: { id }
        });

        if (!detail) {
            return res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Order not found!', 'Error', ''));
        }

        // Check if collection_details exists and is an array
        // if (Array.isArray(detail.collection_details)) {
        //     let updatedDetails = detail.collection_details.map((item) => {
        //         let element = item.toJSON();
        //         if (detail.type !== 'customer') {
        //             element.invoiceModel = null;
        //         } else {
        //             element.GrnModel = null;
        //         }
        //         return element;
        //     });

        //     detail = detail.toJSON();
        //     detail.collection_details = updatedDetails;
        // }

        if (detail.payment_type == 1) {
            let details = await GrnModel.findOne({
                attributes: ['id', 'grn_number'],
                where: {
                    id: detail.transaction_no
                }
            });
            detail = detail.toJSON();
            detail.transaction_num = details.grn_number;
            detail.transaction = details;
        } else if (detail.payment_type == 2) {
            let details = await InvoiceModel.findOne({
                attributes: ['id', 'invoice_number'],
                where: {
                    id: detail.transaction_no
                }
            });
            detail = detail.toJSON();
            detail.transaction_num = details.invoice_number;
            detail.transaction = details;
        } else {
            let details = await OrderModel.findOne({
                attributes: ['id', 'order_number'],
                where: {
                    id: detail.transaction_no
                }
            });
            detail = detail.toJSON();
            detail.transaction_num = details.order_number;
            detail.transaction = details;
        }
        let collection_details = detail.collection_details;
        for (var i = 0; i < collection_details.length; i++) {

            // collection_details[i]=collection_details[i].toJSON();
            if (collection_details[i].payment_mode == "check_type") {

                let details = await BankModel.findOne({
                    // attributes: ['id','order_number'],
                    where: {
                        id: collection_details[i].type
                    }
                });
                collection_details[i].bank = details;
            }

        }

        res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Order retrieved successfully!', '', detail));

    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}


const UpdateCollection = async (req, res, next) => {
    const {
        id,
        // type,
        // customer_id,
        // payment_type,
        // date,
        // bank_num,
        // check_num,
        // bankname,
        // total,
        payment_no,
        balance_amount,
        payment_mode,
        date,
        transaction_no,
        approved_by,
        payment_type,
        cash,
        bankname,
        voucher,
        credit_card,
        pay_account_no,
        pay_branch_location,
        total_payment_amount,
        note1,
        note2,
        note3,
        itmtaxdt1,
        itmtaxdt2,
        status,
        addedby,
        items,
    } = req.body;

    try {
        // Find the existing order and its details
        const detail = await CollectionModel.findOne({
            include: [
                {
                    model: CollectionDetailModel,
                    as: 'collection_details',
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
        await CollectionModel.update({
            // type: type,
            // customer_id: customer_id,
            // payemnt_type: payment_type,
            collection_date: date,
            // bank_num: bank_num,
            // cheque_number: check_num,
            // bank_info: bankname,
            // total: total,

            payment_no: payment_no,
            balance_amount: balance_amount,
            payment_mode: payment_mode,
            date: date,
            transaction_no: transaction_no,
            approved_by: approved_by,
            payment_type: payment_type,
            cash: cash,
            bankname: bankname,
            voucher: voucher,
            credit_card: credit_card,
            pay_account_no: pay_account_no,
            pay_branch_location: pay_branch_location,
            total_payment_amount: total_payment_amount,
            note1: note1,
            note2: note2,
            note3: note3,
            itmtaxdt1: itmtaxdt1,
            itmtaxdt2: itmtaxdt2,
            status: status,
        }, {
            where: {
                id: id
            }
        });

        const deletedCount = await CollectionDetailModel.destroy({
            where: {
                collection_id: id
            }
        });
        for (let i = 0; i < items.length; i++) {
            await CollectionDetailModel.create({
                collection_id: detail.id,
                payment_mode: items[i].payment_mode,
                type: items[i].type,
                amount: items[i].amount,
            });

        }

        res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Successfully updated Order', '', detail));
    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}

const delete_collection = async (req, res, next) => {
    const { id } = req.body;

    try {
        // Attempt to soft delete the order
        const deletedCount = await CollectionModel.destroy({
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

const collection_status_update = async (req, res, next) => {
    const { comment, id } = req.body;
    try {
        const detail = await CollectionModel.findOne({
            where: {
                id: id
            }
        });

        if (!detail) {
            return res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Order not found', 'Error'));
        }

        // Update the order details
        await CollectionModel.update({
            comment: comment,
            collection_status: 'Approved'
        }, {
            where: {
                id: id
            }
        });

        res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Successfully Payment Approved', '', ''));
    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}

module.exports = {
    list,
    store,
    UpdateCollection,
    details,
    delete_collection,
    collection_status_update
};
