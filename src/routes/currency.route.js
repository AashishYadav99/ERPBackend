const express = require('express')
const { list, store, list_details,list_delete,list_by_type,update } = require("../controller/currency.controller")
const Auth = require("../middleware/Auth")
const { upload, uploadFile } = require("../middleware/UploadFile")



const router = new express.Router()

router.post('/list', list);
router.post('/store', store);
router.post('/update', update);
router.post('/details', list_details);
router.post('/delete', list_delete);
router.post('/list_by_type', list_by_type);


module.exports = router;