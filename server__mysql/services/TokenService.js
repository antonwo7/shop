const jwt = require('jsonwebtoken')
const Token = require('../models/Token')

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

    async saveToken(userId, refreshToken) {
        const token = await Token.findOne({where: {user_id: userId}})

        if (token) {
            token.refresh_token = refreshToken
            return await token.save();
        }

        return await Token.create({user_id: userId, refresh_token: refreshToken});
    }

    async removeToken(refreshToken) {
        return await Token.destroy({where: {refresh_token: refreshToken}});
    }

    async findToken(refreshToken) {
        return await Token.findOne({where: {refresh_token: refreshToken}});
    }
}

module.exports = new TokenService()