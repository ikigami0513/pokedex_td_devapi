const express = require('express');
const user = require('../controllers/user');
const { check_token } = require('../middlewares/check_token');
const { is_admin } = require('../middlewares/is_admin');

const router = express.Router();

router.post('/login', user.login);
router.post('/register', user.register);
router.get('/get', check_token, user.get)
router.get('/all', check_token, is_admin, user.get_all);

module.exports = router;
