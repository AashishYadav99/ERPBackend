const express = require('express')
const items = require("../controller/items.controller")
const Auth = require("../middleware/Auth")
const { upload, uploadFile } = require("../middleware/UploadFile")



const router = new express.Router()

router.post('/list', items.list);
router.post('/store', items.store);
router.post('/update', items.update);
// router.post('/store', upload.single('image'), items.store);
// router.post('/update', upload.single('image'), items.update);
router.post('/details', items.details);
router.post('/delete', items.delete_item);


module.exports = router;
