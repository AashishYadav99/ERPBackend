const express = require('express')
const supplier = require("../controller/supplier.controller")
const Auth = require("../middleware/Auth")
const { upload, uploadFile } = require("../middleware/UploadFile")



const router = new express.Router()

router.post('/list', supplier.list);
router.post('/store', supplier.store);
router.post('/update', supplier.update);
router.post('/details', supplier.details);
router.post('/delete', supplier.delete_customer);

module.exports = router;
