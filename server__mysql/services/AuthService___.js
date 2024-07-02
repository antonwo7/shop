const jwt = require('jsonwebtoken')
const {secret, tokenExpiresIn} = require('../config')
const moment = require('moment')
const User = require("../models/User")
const Role = require("../models/Role")

class AuthService
{
    generateToken = (payload) => {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    }

    decodeToken = (token) => {
        try {
            return jwt.verify(token, secret)
        } catch(err) {
            return false
        }
    }

    validateToken = async (token) => {
        try {
            const tokenData = this.decodeToken(token)
            if (!tokenData || !tokenData.id || !tokenData.role) return false
            if (tokenData.exp <= moment().unix()) return false

            const user = await User.findOne({
                raw: true,
                where: {id: tokenData.id},
                attributes: ['id', 'name', 'email', 'role_id']
            })
            if (!user) return false

            const userRole = await Role.findOne({raw: true, where: {name: tokenData.role}, attributes: ['name']})
            if (!userRole) return false

            return {...user, role: tokenData.role}
        } catch (e) {
            return typeof e == "boolean" ? e : false
        }
    }
}

module.exports = new AuthService()