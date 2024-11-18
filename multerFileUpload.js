const multer = require('multer');
const path = require('path');
function fileUpload(filePath){
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, filePath)
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null,  uniqueSuffix + file.originalname)
        }
    });
    const upload = multer({ storage: storage })
    return upload;
}

module.exports = {fileUpload};


