const express = require('express')
const items = require("../controller/customer_info.controller")
const Auth = require("../middleware/Auth")
const { upload, uploadFile } = require("../middleware/UploadFile")



const router = new express.Router()

router.post('/list', items.list);
router.post('/store', items.store);
router.post('/update', items.update);
router.post('/details', items.details);
router.post('/delete', items.delete_customer);
router.post('/details_by_mobile', items.details_by_mobile);
router.post('/store_by_mobile', items.store_by_mobile);
router.post('/customer_details', items.customer_details);


module.exports = router;
