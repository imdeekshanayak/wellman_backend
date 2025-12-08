const fs = require("fs");
const multer = require("multer");
const path = require("path");

// Create uploads folder automatically
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); 
    },

    filename: function (req, file, cb) {
        const fileSuffix = Date.now() + "-" + Math.round(Math.random() * 10000);
        cb(null, fileSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

module.exports = upload;
