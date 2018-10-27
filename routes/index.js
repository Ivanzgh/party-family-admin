const express = require('express');
const router = express.Router();

const admin = require('../contraller/admin')
const news = require('../contraller/news')
const swiper = require('../contraller/swiper')
const category = require('../contraller/category')

router.use(admin)
router.use(news)
router.use(swiper)
router.use(category)


module.exports = router;
