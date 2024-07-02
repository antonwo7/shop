const {DataTypes} = require('sequelize')
const {sequelize} = require('../services/BDService')

const Net = sequelize.define('Net', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    url: { type: DataTypes.STRING, defaultValue: null, allowNull: true }
}, {
    timestamps: false
})

module.exports = Net