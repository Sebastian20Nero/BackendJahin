const multer = require('multer')

function uploadfile(){ 
    const storage = multer.diskStorage({
        destination: './uploads/images',
        filename: function ( _req, file, cb) {
            var extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
          cb(null, Date.now()+extension)
        }
      })
      const upload = multer({ storage: storage }).single('image')
      return upload;
}

module.exports = uploadfile; 