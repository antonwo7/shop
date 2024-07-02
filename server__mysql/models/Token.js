const User = require('./User')
const {DataTypes} = require('sequelize')
const {sequelize} = require('../services/BDService')

const Token = sequelize.define('Token', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    refresh_token: { type: DataTypes.STRING, allowNull: false}
}, {
    timestamps: false
})

Token.belongsTo(User, {
    foreignKey : 'user_id',
    as: 'user'
})

module.exports = Token;