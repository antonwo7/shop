const {Schema, model, Types} = require('mongoose')

module.exports = model('Product_Category', new Schema({
    name: {type: String, required: true},
    parent_id: [{type: Types.ObjectId, ref: 'Product_Category'}]
}))