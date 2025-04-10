const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/img/profileimg')
    },
    filename: function (req, file, cb) {
      const encodedimgname = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
      cb(null, file.fieldname + '-' + encodedimgname)
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload;