require('dotenv').config();
const { Op, Sequelize, fn, col, where } = require('sequelize');
const ResponseFormatter = require('../utils/ResponseFormatter');
const db = require('../models');
const { city } = require('../models');

const { codesettingupdate } = require('../utils/handler');

const paths = require('path');
const base_url = process.env.BASE_URL;

const list = async (req, res, next) => {
    const {
        country_id,
        state_id
    } = req.body;
    try {
        let payment_typeList
        if(country_id== '' && state_id == ''){
            payment_typeList = await city.findAll();
        }else{
            payment_typeList = await city.findAll({
                where:{
                    country_id:country_id,
                    state_id:state_id,
                }
            });
        }
        

        if (!payment_typeList) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'city category not found!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', payment_typeList));
        }

    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}
const store = async (req, res, next) => {
    const {
        country_id,
        state_id,
        name,
    } = req.body;

    try {
        // console.log('images', );
        let citys = await city.create({
            country_id: country_id,
            state_id: state_id,
            name: name,
        })

        


        if (!citys) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Something went wrong!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', citys));
        }

    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}

const list_details = async (req, res, next) => {

    const { id } = req.body;
    try {

        let citys = await city.findOne(
            {
                where: {
                    id: id
                },
            }
        )

        if (!citys) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Something went wrong!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', citys));
        }

    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}
const list_delete = async (req, res, next) => {

    const { id } = req.body;
    try {

        const deletedCount = await city.destroy({
            where: {
                id: id
            }
        });

        if (deletedCount === 0) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'city not found!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, 'city deleted successfully (soft delete)!', '', { deletedCount }));
        }


    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}

const update = async (req, res, next) => {
    const {
        id,
        name,
        state_id,
        country_id,
    } = req.body;
    try {

        // console.log('images', );
        let citys = await city.update({
            name: name,
            country_id: country_id,
            state_id: state_id,
        }, {
            where: {
                id: id
            }
        })

        if (!citys) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Something went wrong!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', citys));
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
    update,
};
