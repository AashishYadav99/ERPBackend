const multer = require('multer')
const path = require("path")


const getUploadFolder = (req) => {

    const route = req.baseUrl;
    const uploadFolders = {
        '/api/festival': './public/uploads/festival',
        '/api/sponsor': './public/uploads/sponsor',
        '/api/program': './public/uploads/program',
        '/api/information': './public/uploads/information',
        '/api/nationality': './public/uploads/nationality',
        '/api/ticket': './public/uploads/tickets',
        '/api/market_place': './public/uploads/markets',
        '/api/ticket_purchases': './public/uploads/ticket_purchase',
        '/api/stand': './public/uploads/stand',
        '/api/admin-app-setting': './public/uploads/comSetting',
        '/api': './public/uploads/userProfile',
    };
    return uploadFolders[route] || './public/uploads';
};

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const uploadFolder = getUploadFolder(req);
        callback(null, uploadFolder);
    },

    filename: function (req, file, callback) {
        
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
       
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        //console.log(file.mimetype)
        // if (
        //     file.mimetype == "image/jpeg" ||
        //     file.mimetype == "image/png" ||
        //     file.mimetype == "image/jpg"
        // ) {
            cb(null, true);
        // } else {
        //     cb(null, false);
        //     return cb(new Error("Only image file format allowed!"));
        // }
    },
});

module.exports = {
    storage,
    upload
}