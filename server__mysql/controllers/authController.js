require('dotenv').config()
const {validationResult} = require('express-validator')
const authService = require('../services/AuthService')
const User = require("../models/User")
const CApiError = require("../classes/CApiError");

class authController
{
    async registration (req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(CApiError.badRequest('Registration error', errors.array()))
            }

            const { name, email, password } = req.body
            const userData = await authService.registration(name, email, password)

            res.cookie('refreshToken', userData.refresh, {maxAge: 30*24*60*60*1000, httpOnly: true})

            return res.json(userData)

        } catch(e) {
            next(e)
        }
    }

    async login (req, res, next) {
        try {
            const { email, password } = req.body
            const userData = await authService.login(email, password)

            res.cookie('refreshToken', userData.refresh, {maxAge: 30*24*60*60*1000, httpOnly: true})

            return res.json(userData)

        } catch(e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            if (!refreshToken) {
                return res.json({})//res.status(400).send('Token incorrect')
            }

            await authService.logout(refreshToken)

            res.clearCookie('refreshToken')

            return res.json({})

        } catch(e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await authService.activate(activationLink)

            return res.redirect(process.env.CLIENT_URL)
        } catch(e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await authService.refresh(refreshToken)

            res.cookie('refreshToken', userData.refresh, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData)
        } catch(e) {
            next(e)
        }
    }

    async validate(req, res, next) {
        try {
            const userData = await authService.validate(req.user)
            return res.json(userData)

        } catch(e) {
            next(e)
        }
    }
}

module.exports = new authController()