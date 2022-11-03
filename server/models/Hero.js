const mongoose = require('mongoose')

// 英雄模型
const schema = new mongoose.Schema({
    name: {type: String},
    avatar: {type: String},
    title: {type: String},
    categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}], // 一个英雄可以对应多个分类
    scores: {
        difficult: {type: Number},
        skills: {type: Number},
        attack: {type: Number},
        survive: {type: Number}
    },
    skills: [{
        name: {type: String},
        icon: {type: String},
        description: {type: String},
        tips: {type: String}
    }],
    items1: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
    items2: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
    usageTips: {type: String},
    battleTips: {type: String},
    teamTips: {type: String},
    // partners: [{
    //     hero: {type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'},
    //     description: {type: String}
    // }]
})

module.exports = mongoose.model('Hero', schema)