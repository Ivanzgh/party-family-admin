const mongoose = require('mongoose');

const news = new mongoose.Schema({
    category : String,
    header : String,
    title : String,
    lookNumber : Number,
},{versionKey: false, timestamps : {createdAt:'createTime',updatedAt:'updateTime'}});

module.exports = mongoose.model('news',news);

