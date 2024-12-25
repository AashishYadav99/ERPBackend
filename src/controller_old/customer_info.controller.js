const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op, Sequelize, fn, col, where } = require('sequelize');
const ResponseFormatter = require('../utils/ResponseFormatter');
const db = require('../models');
const CustomerInfoModel = db.customer_info;
const UserModel = db.user_master;
const countryMastersModel = db.country_masters;
const { codesettingupdate } = require('../utils/handler');

require('dotenv').config();
const paths = require('path');
const { includes } = require('lodash');
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
        const totalRecords = await CustomerInfoModel.count();
        const festivalRes = await CustomerInfoModel.findAll(
            {
                //     where: searchQuery,
                attributes: ['id', 'customer_code', 'user_id', 'status'],
                include: [
                    {
                        model: UserModel,
                        as: 'users',    // The associated User model
                        // attributes: ['firstname', 'lastname', 'email', 'mobile', 'country_id'],
                        include: [
                            {
                                model: countryMastersModel,
                                as: 'country',    // The associated User model
                                attributes: ['id', 'name'],
                            }
                        ]
                    },
                ],
                // where: {
                //     [Op.or]: searchQuery
                // },
                // where: searchQuery,
                where: {is_supplier: 0},
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
        cusname,
        // lastname,
        // firstname,
        country_id,
        mobile,
        status,
        // customer_code,
        cuscode,
        customer_address_1,
        customer_address_2,
        cusemail1,
        // subemail2,
        // cusemail3,
        // cusemail4,
        // cussname,
        // cuscomname,
        custax1,
        // custax2,
        // custax3,
        // cusauth,
        // cusfax,
        // cusdob,
        // cusanndt,
        // custoll,
        // cusconpername,
        // cusconpername2,
        // cusconpername3,
        // cusphone,
        // cusphone2,
        // cusphone3,
        // mobile2,
        // custaxdt1,
        // custaxdt2,
        // note1,
        // note2,
        // addedby,
        // createddt,
        // category,
        // custitle,
        // cusadd3,
        // cusbrand,
        // otherno,
    } = req.body;

    try {
        let email_check = await UserModel.count({ where: { usertype: 2, email: cusemail1 } });
        if (email_check > 0) {
            res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Email all ready exit', 'Error', ''));
            return;
        }

        codesettingupdate('customer');


        let user = await UserModel.create({
            email: cusemail1,
            // cusemail1: cusemail1,
            usertype: 2,
            firstname: cusname,
            // lastname: lastname,
            mobile: mobile,
            password: '12345',
            country_id: country_id,
            // subemail2:subemail2,
            // cusemail3:cusemail3,
            // cusemail4:cusemail4,
            // cussname:cussname,
            // cuscomname:cuscomname,
            custax1:custax1,
            // custax2:custax2,
            // custax3:custax3,
            // cusauth:cusauth,
            // cusfax:cusfax,
            // cusdob:cusdob,
            // cusanndt:cusanndt,
            // custoll:custoll,
            // cusconpername:cusconpername,
            // cusconpername2:cusconpername2,
            // cusconpername3:cusconpername3,
            // cusphone:cusphone,
            // cusphone2:cusphone2,
            // cusphone3:cusphone3,
            // mobile2:mobile2,
            // custaxdt1:custaxdt1,
            // custaxdt2:custaxdt2,
            // note1:note1,
            // note2:note2,
            // addedby:addedby,
            // createddt:createddt,
            // category:category,
            // custitle:custitle,
            // cusadd3:cusadd3,
            // cusbrand:cusbrand,
            // otherno:otherno,
        })


        const customer = await CustomerInfoModel.create({
            user_id: user.id,
            organisation_id: 2,
            // customer_code: customer_code,
            customer_code: cuscode,
            customer_address_1: customer_address_1,
            customer_address_2: customer_address_2,
            customer_phone: mobile,
            status: parseInt(status),
            is_supplier: 0,
        })
        res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Successfully Customer Create', '', customer));
    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}
const update = async (req, res, next) => {
    const {
        id,
        cusname,
        // lastname,
        // firstname,
        country_id,
        mobile,
        status,
        // customer_code,
        customer_address_1,
        customer_address_2,
        cusemail1,
        // subemail2,
        // cusemail3,
        // cusemail4,
        // cussname,
        // cuscomname,
        custax1,
        // custax2,
        // custax3,
        // cusauth,
        // cusfax,
        // cusdob,
        // cusanndt,
        // custoll,
        // cusconpername,
        // cusconpername2,
        // cusconpername3,
        // cusphone,
        // cusphone2,
        // cusphone3,
        // mobile2,
        // custaxdt1,
        // custaxdt2,
        // note1,
        // note2,
        // addedby,
        // createddt,
        // category,
        // custitle,
        // cusadd3,
        // cusbrand,
        // otherno,
    } = req.body;

    try {
        // codesettingupdate('customer');
        const customer_find = await CustomerInfoModel.findOne(
            {
                //     where: searchQuery,
                attributes: ['id', 'customer_code', 'user_id'],
                include: [
                    {
                        model: UserModel,
                        as: 'users',    // The associated User model
                        attributes: ['firstname', 'lastname', 'email'],

                    }
                ],
                where: {
                    id: id
                }
            }
        );
        if (!customer_find) {
            return res.status(404).json(ResponseFormatter.setResponse(false, 404, 'customer not found', 'Error'));
        }

        let email_check = await UserModel.count({
            where: {
                usertype: 2,
                email: { [Op.eq]: cusemail1 },
                id: { [Op.ne]: customer_find.user_id }
            }
        });
        if (email_check > 0) {
            res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Email all ready exit', 'Error', ''));
            return;
        }


        let user = await UserModel.update({
            email: cusemail1,
            // cusemail1: cusemail1,
            usertype: 2,
            firstname: cusname,
            // lastname: lastname,
            mobile: mobile,
            password: '12345',
            country_id: country_id,
            // subemail2:subemail2,
            // cusemail3:cusemail3,
            // cusemail4:cusemail4,
            // cussname:cussname,
            // cuscomname:cuscomname,
            custax1:custax1,
            // custax2:custax2,
            // custax3:custax3,
            // cusauth:cusauth,
            // cusfax:cusfax,
            // cusdob:cusdob,
            // cusanndt:cusanndt,
            // custoll:custoll,
            // cusconpername:cusconpername,
            // cusconpername2:cusconpername2,
            // cusconpername3:cusconpername3,
            // cusphone:cusphone,
            // cusphone2:cusphone2,
            // cusphone3:cusphone3,
            // mobile2:mobile2,
            // custaxdt1:custaxdt1,
            // custaxdt2:custaxdt2,
            // note1:note1,
            // note2:note2,
            // addedby:addedby,
            // createddt:createddt,
            // category:category,
            // custitle:custitle,
            // cusadd3:cusadd3,
            // cusbrand:cusbrand,
            // otherno:otherno,
        }, {
            where: {
                id: customer_find.user_id
            }
        })


        const customer = await CustomerInfoModel.update({
            // user_id:user.id,
            // payment_term_id: payment_term_id,
            // organisation_id: 2,
            // is_parent: is_parent,
            // customer_type_id: customer_type_id,
            // customer_address_1: customer_address_1,
            // customer_address_2: customer_address_2,
            // customer_city: customer_city,
            // customer_state: customer_state,
            // customer_zipcode: customer_zipcode,
            // customer_phone: mobile,
            user_id: user.id,
            organisation_id: 2,
            customer_address_1: customer_address_1,
            customer_address_2: customer_address_2,
            customer_phone: mobile,
            status: parseInt(status),
            is_supplier: 0,
            
        }, {
            where: {
                id: id
            }
        })

        const customer_finds = await CustomerInfoModel.findOne(
            {
                //     where: searchQuery,
                attributes: ['id', 'customer_code', 'user_id'],
                include: [
                    {
                        model: UserModel,
                        as: 'users',    // The associated User model
                        attributes: ['firstname', 'lastname', 'email'],

                    }
                ],
                where: {
                    id: id
                }
            }
        );
        res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Successfully Customer update', '', customer_finds));
    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}
const details = async (req, res, next) => {
    const {
        id,
    } = req.body;

    try {
        // codesettingupdate('customer');
        const customer_find = await CustomerInfoModel.findOne(
            {
                //     where: searchQuery,
                // attributes: ['id', 'customer_code', 'user_id'],
                include: [
                    {
                        model: UserModel,
                        as: 'users',    // The associated User model
                        // attributes: ['firstname', 'lastname', 'email'],
                        include: [
                            {
                                model: countryMastersModel,
                                as: 'country',
                                attributes: ['id', 'name'],
                            }
                        ]
                    }
                ],
                where: {
                    id: id
                }
            }
        );
        if (!customer_find) {
            return res.status(404).json(ResponseFormatter.setResponse(false, 404, 'customer not found', 'Error'));
        }
        res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Successfully Customer retrive', '', customer_find));
    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}
const delete_customer = async (req, res, next) => {
    const { id } = req.body;

    try {
        // Attempt to soft delete the order
        const customer_find = await CustomerInfoModel.findOne(
            {
                where: {
                    id: id
                }
            }
        );
        if (!customer_find) {
            return res.status(404).json(ResponseFormatter.setResponse(false, 404, 'customer not found', 'Error'));
        }

        const cust_del = await CustomerInfoModel.destroy({
            where: {
                id: id
            }
        });
        const user_del = await UserModel.destroy({
            where: {
                id: customer_find.user_id
            }
        });
        res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Customer Deleted!', ''));

    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
};
module.exports = {

    list,
    store,
    update,
    details,
    delete_customer

};
