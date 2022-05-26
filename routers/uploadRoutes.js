const express = require('express');
const router = express.Router();
const multer = require('multer');
const {srcTargetMappingController}  = require('../controllers/meta.Controller')
router.use('/upload', express.static('csvs'));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './csvs')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})

function fileFilter(req, file, cb) {
    if (file.mimetype === 'text/csv'){
        // To accept the file pass `true`, like so:
        cb(null, true)
    } else {
        // To reject this file pass `false`, like so:
        cb(null, false)
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

// router.use('/', upload.single('file') ,(req,res) => {
//     console.log(req.body, req.file);
//     res.json("ok");
// });

router.post('/mapping', upload.single('file'),srcTargetMappingController);

module.exports = router;
