const express = require('express')
const { list, listdropdown } = require("../controller/countryMaster.controller")
const Auth = require("../middleware/Auth")
const { upload, uploadFile } = require("../middleware/UploadFile")



const router = new express.Router()

router.post('/list', Auth, list);
router.get('/list-dropdown', Auth, listdropdown);


module.exports = router;
