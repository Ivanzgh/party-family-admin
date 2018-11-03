const mongoose = require('mongoose');

const admin = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nickname: String,
    desc: String,
    sex: String,
    avatar : String
}, {versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}});

module.exports = mongoose.model('admin', admin);

