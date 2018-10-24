const express = require('express');
const router = express.Router();

const admin = require('../contraller/admin')
const news = require('../contraller/news')

router.use(admin)
router.use(news)


module.exports = router;
