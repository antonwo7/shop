const {DataTypes} = require('sequelize')
const {sequelize} = require('../services/BDService')

const ProductProductPropertyValue = sequelize.define('product_product_property_value', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false, ref: 'Product' },
    product_property_value_id: { type: DataTypes.INTEGER, allowNull: false, ref: 'ProductPropertyValue' },
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE }
}, {
    timestamps: false,
    underscored: true
})

module.exports = ProductProductPropertyValue