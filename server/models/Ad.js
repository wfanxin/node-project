const mongoose = require('mongoose')

// 广告位模型
const schema = new mongoose.Schema({
    name: {type: String},
    items: [{
        image: {type: String},
        url: {type: String}
    }]
})

module.exports = mongoose.model('Ad', schema)