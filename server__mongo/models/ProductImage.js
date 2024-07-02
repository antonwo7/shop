const {Schema, model} = require('mongoose')

module.exports = model('Product_Image', new Schema({
    name: {type: String, required: true}
}))