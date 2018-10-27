const mongoose = require('mongoose');

const news = new mongoose.Schema({
    header : String,
    title : String,
    author : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'admin'
    },
    content : String,
    contentText : String,
    type : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'category'
    },
    lookNumber : {
        type : Number,
        default : 0
    },
},{versionKey: false, timestamps : {createdAt:'createTime',updatedAt:'updateTime'}});

module.exports = mongoose.model('news',news);

