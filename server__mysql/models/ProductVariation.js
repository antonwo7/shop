const Product = require("./Product");
const {DataTypes} = require('sequelize')
const {sequelize} = require('../services/BDService')

const ProductVariation = sequelize.define('product_variations', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false, ref: 'Product' },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE }
}, {
    timestamps: true,
    underscored: true
})

module.exports = ProductVariation