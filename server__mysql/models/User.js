const {DataTypes} = require('sequelize')
const {sequelize} = require('../services/BDService')

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role_id: { type: DataTypes.INTEGER, ref: 'Role' },
    name: { type: DataTypes.STRING, allowNull: false },
    is_activated: { type: DataTypes.BOOLEAN, defaultValue: false },
    activation_link: { type: DataTypes.STRING }
}, {
    timestamps: false
})

module.exports = User