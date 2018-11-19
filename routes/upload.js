const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

fs.readdir('uploads', (error) => {
    if (error) {
      console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
      fs.mkdirSync('uploads');
    }
});

const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, 'uploads/');
      },
      filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/img', upload.single('img'), (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
});

module.exports = router;