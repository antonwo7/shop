const {DataTypes} = require('sequelize')
const {sequelize} = require('../services/BDService')

const ProductProperty = sequelize.define('product_property', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE }
}, {
    timestamps: true,
    underscored: true
})

module.exports = ProductProperty