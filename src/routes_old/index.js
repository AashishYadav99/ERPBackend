const express = require('express')

/*--------------------------*/

/*** Import Module Routes ***/
const userMasterRoute = require("./user_master.route")
const reportRoute = require("./report.route")
const batchRoute = require("./batch.route")
const itemMasterRoute = require("./item_master.route")
const itemColorRoute = require("./item_color.route")
const itemCategoryRoute = require("./item_category.route")
const sizeMasterRoute = require("./size_master.route")
const familyMasterRoute = require("./family_master.route")
const taxMasterRoute = require("./tax_master.route")
const subFamilyMasterRoute = require("./sub_family_master.route")
const itemDepartmentRoute = require("./item_department.route")
const itemUomRoute = require("./item_uom.route")
const brandRoute = require("./brand.route")
const CustomerInfoRoute = require("./customer_info.route")
const SalesmanInfoRoute = require("./salesman_info.route")
const CodeSettingRoute = require("./code_setting.route")
const OrderRoute = require("./order.route")
const PurchaseOrderRoute = require("./purchase_order.route")
const GrnRoute = require("./grn.route")
const InvoiceRoute = require("./invoice.route")
const dashboardRoute = require("./dashboard.route")
const countryRoute = require("./country.route")
const PortfoliocategoryRoute = require("./portfolio_category.route")
const SupplierRoute = require("./supplier.route")
const ProductMasterRoute = require("./product_master.route")

/** ------------ **
Defining Routes
** ------------ **/
const router = new express.Router()

/*** Module Specific Routes ***/

router.use('/', userMasterRoute);
router.use('/item', itemMasterRoute);
router.use('/batch', batchRoute);
router.use('/item_color', itemColorRoute);
router.use('/item_category', itemCategoryRoute);
router.use('/item_department', itemDepartmentRoute);
router.use('/size_master', sizeMasterRoute);
router.use('/family_master', familyMasterRoute);
router.use('/tax_master', taxMasterRoute);
router.use('/sub_family_master', subFamilyMasterRoute);
router.use('/brand', brandRoute);
router.use('/item_uom', itemUomRoute);
router.use('/customer', CustomerInfoRoute);
router.use('/salesman', SalesmanInfoRoute);
router.use('/code_setting', CodeSettingRoute);
router.use('/order', OrderRoute);
router.use('/report', reportRoute);
router.use('/purchase_order', PurchaseOrderRoute);
router.use('/grn', GrnRoute);
router.use('/invoice', InvoiceRoute);
router.use('/dashboard', dashboardRoute);
router.use('/country', countryRoute);
router.use('/Portfolio-category', PortfoliocategoryRoute);
router.use('/supplier', SupplierRoute);
router.use('/product_master', ProductMasterRoute);
/*** Export Routrer for import in main application file ***/
module.exports = router;
