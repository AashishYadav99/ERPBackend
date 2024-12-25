require('dotenv').config();
const { Op, Sequelize, fn, col, where } = require('sequelize');
const ResponseFormatter = require('../utils/ResponseFormatter');
const { portfolio_category, portfolio, portfolio_images } = require('../models');
const { codesettingupdate } = require('../utils/handler');

const paths = require('path');
const base_url = process.env.BASE_URL;

const list = async (req, res, next) => {

    try {
        const portfoliocategoryList = await portfolio_category.findAll();



        if (!portfoliocategoryList) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'portfolio category not found!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', portfoliocategoryList));
        }

    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}


const store = async (req, res, next) => {
    const {
        title,
        category,
        images,
    } = req.body;

    try {
        // console.log('images', );
        let portfolios = await portfolio.create({
            title: title,
            category_id: category,
        })

        let images = req.files;

        for (let index = 0; index < images.length; index++) {
            const element = images[index];
            const newStr = element.path.replace('public/', '');

            let portfolios_id = await portfolio_images.create({
                portfolio_id: portfolios.id,
                image: newStr,
            })
        }


        if (!portfolios) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Something went wrong!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', portfolios));
        }

    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}

const list_p = async (req, res, next) => {
    try {
        // console.log('images', );
        let portfolios = await portfolio.findAll(
            {
                include: [
                    {
                        model: portfolio_category,
                        as: 'portfolio_category',
                        attributes: ['id', 'name'],
                    },
                    {
                        model: portfolio_images,
                        as: 'portfolio_images',
                        attributes: ['id', 'image'],
                    }
                ],
                order: [['id', 'DESC']],
                // limit: limits,
                // offset: offset
            }
        )

        if (!portfolios) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Something went wrong!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', portfolios));
        }

    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}


const list_details = async (req, res, next) => {

    const { id } = req.body;
    try {

        let portfolios = await portfolio.findOne(
            {
                include: [
                    {
                        model: portfolio_category,
                        as: 'portfolio_category',
                        attributes: ['id', 'name'],
                    }
                ],
                where: {
                    id: id
                },
            }
        )

        let get_image = await portfolio_images.findAll({
            where: {
                portfolio_id: id
            }
        })

        for (let index = 0; index < get_image.length; index++) {
            get_image[index].image = "https://newcph4v2.cph4.ch/" + get_image[index].image;
        }

        let new_obj = {
            ...portfolios.toJSON(),
            images: get_image
        }

        if (!portfolios) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Something went wrong!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', new_obj));
        }

    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}

const update = async (req, res, next) => {
    const {
        id,
        title,
        category,
        images,
    } = req.body;
    try {

        // console.log('images', );
        let portfolios = await portfolio.update({
            title: title,
            category_id: category,
        }, {
            where: {
                id: id
            }
        })

        let images = req.files;

        for (let index = 0; index < images.length; index++) {
            const element = images[index];
            const newStr = element.path.replace('public/', '');

            let portfolios_id = await portfolio_images.create({
                portfolio_id: id,
                image: newStr,
            })
        }


        if (!portfolios) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Something went wrong!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, '', '', portfolios));
        }
    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}

const image_remove = async (req, res, next) => {
    const {
        id,
    } = req.body;
    try {
        const user_del = await portfolio_images.destroy({
            where: {
                id: id
            }
        });

        if (!user_del) {
            res.status(404).json(ResponseFormatter.setResponse(false, 404, 'Something went wrong!', 'Error', ''));
        } else {
            res.status(200).json(ResponseFormatter.setResponse(true, 200, 'Image Deleted', '', user_del));
        }
    } catch (error) {
        res.status(400).json(ResponseFormatter.setResponse(false, 400, 'Something went wrong!', 'Error', error.message));
    }
}

module.exports = {
    list,
    store,
    list_p,
    list_details,
    update,
    image_remove
};
