const multer = require('multer')
const path = require("path")

const storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage : storage,
    fileFilter: (req, file, cb) => {
      //console.log(file.mimetype)
      if (
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only image file format allowed!"));
      }
  },
});

module.exports = {
  storage,
  upload
}