const {Schema, model} = require('mongoose')

const Option = model('Option', new Schema({
    name: {type: String, required: true},
    value: {type: String, required: true},
    type: {type: String, required: false}
}))

module.exports = Option