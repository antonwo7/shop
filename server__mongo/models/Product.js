const {Schema, model, Types} = require('mongoose')

module.exports = model('Product', new Schema({
    name: {type: String, required: true},
    sku: {type: String, required: true},
    description: {type: String, required: false},
    properties: [{type: Types.ObjectId, ref: 'Product_Property'}],
    variations: [{type: Types.ObjectId, ref: 'Product_Variation'}],
    images: [{type: Types.ObjectId, ref: 'Product_Image'}],
    categories: [{type: Types.ObjectId, ref: 'Product_Category'}],
}))