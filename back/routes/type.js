const express = require('express');
const type = require('../controllers/type');
const { check_token } = require('../middlewares/check_token');
const { is_admin } = require('../middlewares/is_admin');
const { upload } = require('../settings');

const router = express.Router();

router.post('/add', check_token, is_admin, upload.none(), type.add);
router.get('/get', type.get);
router.get('/all', type.all);
router.get('/image', type.get_image);

module.exports = router;
