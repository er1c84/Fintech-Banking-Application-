const multer = require ("multer");
const path = require ("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb (null, "public/bankImages/")
    },
    filename: (req, file, cb) => {
        cb (null, Date.now()+path.extname(file.originalname))
    }
});

const upload = multer({storage}).single("photo");

const uploadFile = (req, res) => {
    upload (req, res, (err) => {
        if (err) {
            return res.status(400).json ({
                message: err.message
            })
        } 
        if(!req.file) {
            return res.status(400).json({
                message: "N0 file uploaded!"
            })
        }
        res.status(200).json({
            message: "File uploaded successfully",
            pathPath : `bankImages/${req.file.filename}`
        })
    })
}

module.exports = {
    uploadFile
}