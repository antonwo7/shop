const {Schema, model, Types} = require('mongoose')

module.exports = model('Product_Variation', new Schema({
    quantity: {type: Number, required: false, defaultValue: 0},
    price: {type: Number, required: true},
    description: {type: Text, required: false},
    properties: [{type: Types.ObjectId, ref: 'Product_Properties'}],
    product: {type: Types.ObjectId, ref: 'Product'}
}))