const {Schema, model, Types} = require('mongoose')

module.exports = model('Product_Properties', new Schema({
    name: {type: String, required: true},
    value: {type: String, required: true},
    is_static: {type: Boolean}
}))