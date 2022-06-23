const multer = require('multer');

// Create multer object
const fileUpload = multer({
    dest: 'temp',
});

module.exports = {
    fileUpload: fileUpload    
}