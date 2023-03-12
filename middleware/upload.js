
// TIDAK DI PAKAI..........................

const multer  = require("multer");
const { extname } = require("path");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "./uploads");
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    const validExts = [".png", ".jpg", ".jpeg"];

    if(!validExts.includes(path.extname(file.originalname))){
        return callback(new error("Only .png, .jpg & jpeg format allowed"));
    }

    const fileSize = parseInt (req.headers['content-length']);
    if(fileSize > 1046576){
        return callback(new error("File size is too big"));
    }

    callback(null, true);

};

let upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    fileSize: 1048576,
});

module.exports = upload.single("productImage");