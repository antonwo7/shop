const {DataTypes} = require('sequelize')
const {sequelize} = require('../services/BDService')

const ProductPropertyValue = sequelize.define('product_property_value', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    product_property_id: { type: DataTypes.INTEGER, allowNull: false, ref: 'ProductProperty' },
    value: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE }
}, {
    timestamps: false,
    underscored: true
})

module.exports = ProductPropertyValue