    require('dotenv').config();
    const { Op, Sequelize, fn, col, where } = require('sequelize');
    const ResponseFormatter = require('../utils/ResponseFormatter');
    const { country_masters } = require('../models');
    const { codesettingupdate } = require('../utils/handler');

    const paths = require('path');
    const base_url = process.env.BASE_URL;

    const list = async (req, res, next) => {
        const { page, name, customer_code, limit = 10 } = req.body;

        try {
            const currentPage = page ? parseInt(page) : 1;
            const limits = parseInt(limit);
            const offset = (currentPage - 1) * limits;
            const totalRecords = await country_masters.count();
            const countryList = await country_masters.findAll();

            // console.log("Base URL:", process.env.BASE_URL);
            const totalPages = Math.ceil(totalRecords / limits);
            const pagination = {
                records: countryList,
                currentPage: currentPage,
                pageSize: limits,
                totalRecords: totalRecords,
                totalPages: totalPages
            };

            if (!countryList) {
                res.status(404).json(ResponseFormatter.setResponse(false, 404, 'country not found!', 'Error', ''));
            } else {
                res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', pagination));
            }

        } catch (error) {
            res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
        }
    }


    const listdropdown = async (req, res, next) => {
        try {
            const countryList = await country_masters.findAll();

            if (!countryList) {
                res.status(404).json(ResponseFormatter.setResponse(false, 404, 'country not found!', 'Error', ''));
            } else {
                res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', countryList));
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
            let states = await country_masters.create({
                name: name,
                country_code: '',
                dial_code: '',
                currency: '',
                currency_code: '',
                currency_symbol: '',
            })




            if (!states) {
                res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Something went wrong!', 'Error', ''));
            } else {
                res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Successfully country create', '', states));
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
            let states = await country_masters.update({
                name: name,
                country_code: '',
                dial_code: '',
                currency: '',
                currency_code: '',
                currency_symbol: '',
            }, {
                where: {
                    id: id
                }
            })

            if (!states) {
                res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Something went wrong!', 'Error', ''));
            } else {
                res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Successfully country create', '', states));
            }
        } catch (error) {
            res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
        }
    }

    const list_delete = async (req, res, next) => {

        const { id } = req.body;
        try {

            const deletedCount = await country_masters.destroy({
                where: {
                    id: id
                }
            });

            if (deletedCount === 0) {
                res.status(404).json(ResponseFormatter.setResponse(false, 404, 'state not found!', 'Error', ''));
            } else {
                res.status(200).json(ResponseFormatter.setResponse(true, 200, 'state deleted successfully (soft delete)!', '', { deletedCount }));
            }


        } catch (error) {
            res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
        }
    }
    const details = async (req, res, next) => {

        const { id } = req.body;
        try {

            const festivalRes = await country_masters.findOne(
                {
                    where: {
                        id: id
                    }
                },
            );

            if (!festivalRes) {
                res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Country not found!', 'Error', ''));
            } else {

                res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Country found', '', festivalRes));
            }

        } catch (error) {
            res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
        }
    }

    module.exports = {
        list,
        listdropdown,
        update,
        store,
        list_delete,
        details
    };
