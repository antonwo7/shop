const {ObjectId} = require("bson")
const uuid = require('uuid')
const bcrypt = require('bcrypt')
const User = require("../models/User")
const mailService = require('../services/MailService')
const tokenService = require('../services/tokenService')
const CApiError = require("../classes/CApiError")
const CUser = require("../classes/CUser")
const {roleNames} = require("../config")

class AuthService
{
    async registration(name, email, password) {
        const candidate = await User.findOne({email})
        if (candidate) {
            throw CApiError.badRequest('User exists')
        }

        const hashedPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        const user = await User.create({name, email, password: hashedPassword, activation_link: activationLink})

        await mailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`)

        const userObj = new CUser({...user.toObject()})
        const tokens = tokenService.generateTokens(userObj.plain())
        await tokenService.saveToken(user._id, tokens.refreshToken)

        return {
            refresh: tokens.refreshToken,
            access: tokens.accessToken,
            user: userObj.plain()
        }
    }

    async login(email, password) {
        const user = await User.findOne({email})
        if (!user) {
            throw CApiError.badRequest('User not found')
        }

        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw CApiError.badRequest('Incorrect password')
        }

        const userObj = new CUser({...user.toObject()})
        const tokens = tokenService.generateTokens(userObj.plain())

        await tokenService.saveToken(user._id, tokens.refreshToken)

        return {
            refresh: tokens.refreshToken,
            access: tokens.accessToken,
            user: userObj.plain()
        }
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw CApiError.unauthorizedError()
        }

        const userData = tokenService.validateToken(refreshToken)
        if (!userData) {
            throw CApiError.unauthorizedError()
        }

        const user = await User.findOne({_id: new ObjectId(userData._id)})
        if (!user || !user.token || user.token !== refreshToken) {
            throw CApiError.unauthorizedError()
        }

        const userObj = new CUser(user.toObject())
        const tokens = tokenService.generateTokens(userObj.plain())

        await tokenService.saveToken(userObj._id, tokens.refreshToken)

        return {
            refresh: tokens.refreshToken,
            access: tokens.accessToken,
            user: userObj.plain()
        }
    }

    async activate(activationLink) {
        const user = await User.findOne({activation_link: activationLink})
        if (!user) {
            throw new CApiError('Incorrect link')
        }

        user.is_activated = true
        await user.save()
    }

    async validate(userData) {
        const userObj = new CUser(userData)

        return {
            user: userObj.plain()
        }
    }
}

module.exports = new AuthService()