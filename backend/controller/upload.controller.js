const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Absolute path to backend/public/bankImages
const uploadDir = path.join(__dirname, "..", "public", "bankImages");

// Create folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage }).single("photo");

const uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file) return res.status(400).json({ message: "No file uploaded!" });

    return res.status(200).json({
      message: "File uploaded successfully",
      path: `/bankImages/${req.file.filename}`,
    });
  });
};

module.exports = { uploadFile };
