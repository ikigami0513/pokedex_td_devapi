const express = require('express');
const pokemon = require('../controllers/pokemon');
const { check_token } = require('../middlewares/check_token');
const { is_admin } = require('../middlewares/is_admin');
const { upload } = require('../settings');

const router = express.Router();

router.get('/all', pokemon.get_page);
router.get('/pokemon', pokemon.get);
router.post('/add', check_token, is_admin, upload.single('image'), pokemon.add);

module.exports = router;
