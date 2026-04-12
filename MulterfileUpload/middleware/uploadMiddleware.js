const multer = require('multer');

// Storage engine configuration
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // images will be saved under uploads folder
        callback(null, 'uploads/')
    },

    filename: (request, file, cb) => {
        // Create a unique filename using timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({
    storage: storage // storage engine configuration
});

module.exports = upload;