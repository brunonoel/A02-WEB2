const multer = require('multer');

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

const uploader = (req, res, next) => {
    upload.single('foto')(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la carga de la imagen' });
        }
        next();
    });
};

module.exports = { uploader };
