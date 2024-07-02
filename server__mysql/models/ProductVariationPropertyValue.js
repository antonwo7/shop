const {DataTypes} = require('sequelize')
const {sequelize} = require('../services/BDService')

const ProductVariationPropertyValue = sequelize.define('product_variation_property_value', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    product_variation_id: { type: DataTypes.INTEGER, allowNull: false, ref: 'ProductVariation' },
    product_property_value_id: { type: DataTypes.INTEGER, allowNull: false, ref: 'ProductPropertyValue' },
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE }
}, {
    timestamps: false,
    underscored: true
})

module.exports = ProductVariationPropertyValue