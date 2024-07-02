const {DataTypes} = require('sequelize')
const {sequelize} = require('../services/BDService')

const ProductImage = sequelize.define('product_image', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false, ref: 'Product' },
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE }
}, {
    timestamps: true,
    underscored: true
})

module.exports = ProductImage