const ProductVariation = require('./ProductVariation');
const ProductProperty = require("./ProductProperty");
const ProductPropertyValue = require("./ProductPropertyValue");
const ProductImage = require("./ProductImage");
const {DataTypes} = require('sequelize')
const {sequelize} = require('../services/BDService')

const Product = sequelize.define('product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    sku: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.INTEGER, ref: 'Role' },
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE }
}, {
    timestamps: true,
    underscored: true
})

Product.hasMany(ProductVariation, {
    foreignKey : 'product_id',
    as: 'variations'
})

ProductVariation.belongsTo(Product, {
    foreignKey : 'product_id', as: 'product'
})

ProductVariation.belongsToMany(ProductPropertyValue, {
    through: 'product_variation_property_values',
    as: 'properties',
    foreignKey: 'product_variation_id',
})

ProductPropertyValue.belongsToMany(ProductVariation, {
    through: 'product_variation_property_values',
    as: 'variations',
    foreignKey: 'product_property_value_id',
})

ProductProperty.hasMany(ProductPropertyValue, {
    foreignKey : 'product_property_id', as: 'property_value'
})

ProductPropertyValue.belongsTo(ProductProperty, {
    foreignKey : 'product_property_id', as: 'property'
})


Product.belongsToMany(ProductPropertyValue, {
    through: 'product_product_property_value',
    as: 'properties',
    foreignKey: 'product_id',
})

ProductPropertyValue.belongsToMany(Product, {
    through: 'product_product_property_value',
    as: 'product',
    foreignKey: 'product_property_value_id',
})

Product.hasMany(ProductImage, {
    foreignKey : 'product_id',
    as: 'images'
})

ProductImage.belongsTo(Product, {
    foreignKey : 'product_id', as: 'product'
})

module.exports = Product