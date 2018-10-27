const mongoose = require('mongoose')

const swiper = new mongoose.Schema({
    imgUrl: {
        type: String,
        required: true
    },
    title: String,
    status: {
        type : String,
        default : 1
    },
    newsID : {           //新闻ID
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'news',
    } ,
    priority : Number  //展示优先级
}, {versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}});

module.exports = mongoose.model('swiper', swiper);