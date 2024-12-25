const express = require('express')
const items = require("../controller/invoice.controller")
const Auth = require("../middleware/Auth")
const { upload, uploadFile } = require("../middleware/UploadFile")



const router = new express.Router()
router.post('/html', items.html_re);
router.post('/list', items.list);
router.post('/add', items.store);
router.post('/delete', items.delete_invoice);
router.post('/details', items.details);
router.post('/update', items.UpdateInvoice);
router.post('/invoice_insert', items.invoice_insert);


module.exports = router;
