const {ObjectId} = require("bson")
const jwt = require('jsonwebtoken')
const User = require("../models/User")
const CApiError = require("../classes/CApiError");

class TokenService
{
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: process.env.JWT_ACCESS_EXPIRES})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: process.env.JWT_REFRESH_EXPIRES})

        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }

    validateToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        } catch(e) {
            return null;
        }
    }

    async saveToken(_id, refreshToken) {
        await User.updateOne({_id: new ObjectId(_id)}, {$set: {token: refreshToken}})
    }

    async removeToken(refreshToken) {
        const userData = this.validateToken(refreshToken)
        if (!userData) {
            throw CApiError.badRequest('User not exists')
        }

        await User.updateOne({_id: new ObjectId(userData._id)}, {$unset: {token: 0}})
    }
}

module.exports = new TokenService()