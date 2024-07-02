const uuid = require('uuid')
const bcrypt = require('bcrypt')
const User = require("../models/User")
const Role = require("../models/Role")
const mailService = require('../services/MailService')
const tokenService = require('../services/TokenService')
const userRoleService = require('../services/UserRoleService')
const CApiError = require("../classes/CApiError");
const CUser = require("../classes/CUser");
const {roleNames} = require("../config")

class AuthService
{
    async registration(name, email, password) {
        const candidate = await User.findOne({ where: { email }, attributes: ['id', 'email'] })
        if (candidate) {
            throw CApiError.badRequest('User exists')
        }

        const hashedPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        const userRoleId = await userRoleService.getRoleIdByName(roleNames.user)
        const user = await User.create({ name, email, password: hashedPassword, role_id: userRoleId, activation_link: activationLink })

        await mailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`)

        const userObj = new CUser({...user.get({ plain: true }), role: roleNames.user})
        const tokens = tokenService.generateTokens(userObj.plain())
        await tokenService.saveToken(user._id, tokens.refreshToken)

        return {
            refresh: tokens.refreshToken,
            access: tokens.accessToken,
            user: userObj.plain()
        }
    }

    async login(email, password) {
        const user = await User.findOne({ raw: true, where: { email }, attributes: ['id', 'name', 'email', 'password', 'role_id', 'is_activated'] })
        if (!user) {
            throw CApiError.badRequest('User not found')
        }

        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw CApiError.badRequest('Incorrect password')
        }

        const userRoleName = await userRoleService.getRoleNameById(user.role_id)
        if (!userRoleName) {
            throw CApiError.badRequest('Incorrect user role')
        }

        const userObj = new CUser({...user, role: userRoleName})
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
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw CApiError.unauthorizedError()
        }

        const user = await User.findByPk(userData.id, { raw: true })
        if (!user) {
            throw CApiError.badRequest('Incorrect user')
        }

        const userRoleName = await userRoleService.getRoleNameById(user.role_id)
        if (!userRoleName) {
            throw CApiError.badRequest('Incorrect user role')
        }

        const userObj = new CUser({...user, role: userRoleName})
        const tokens = tokenService.generateTokens(userObj.plain())

        await tokenService.saveToken(userObj.id, tokens.refreshToken)

        return {
            refresh: tokens.refreshToken,
            access: tokens.accessToken,
            user: userObj.plain()
        }
    }

    async activate(activationLink) {
        const user = await User.findOne({where: {activation_link: activationLink}})
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