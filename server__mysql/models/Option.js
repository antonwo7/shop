const {DataTypes} = require('sequelize')
const {sequelize} = require('../services/BDService')

const Option = sequelize.define('Option', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    value: { type: DataTypes.STRING, defaultValue: null, allowNull: true }
}, {
    timestamps: false
})

module.exports = Option