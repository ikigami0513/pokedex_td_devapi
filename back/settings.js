const multer = require('multer');
const path = require('path');

const secretKey = '7f6f56ed-6d3a-40cb-9128-17eab976586d';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });

module.exports = {
    secretKey,
    upload
}
