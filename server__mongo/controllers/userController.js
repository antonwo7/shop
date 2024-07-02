const Controller = require('../controllers/Controller')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const User = require("../models/User")
const Role = require("../models/Role")
const {roleNames} = require('../config')


class userController extends Controller {
    addUser = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return this.unsuccess(res,{ message: 'User adding error', errors: errors })
            }

            const { username, password, name, nif, naf, contract_code, hours } = req.body
            const date = req.body.date ? paramToDate(req.body.date) : null
            const candidate = await User.findOne({ where: { username }, attributes: ['id', 'username'] })
            if (candidate) {
                return this.unsuccess(res,{ message: "User exist", candidate })
            }

            const hashedPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({ where: { name: roleNames.user }, attributes: ['id', 'name'] })
            if (!userRole) {
                return this.unsuccess(res,{ message: "Role not exist" })
            }

            await User.create({ username, password: hashedPassword, role: userRole.id, name, nif, naf, contract_code, date, hours  })

            const users = await User.findAll({ raw: true, attributes: ['id', 'username', 'name', 'nif', 'naf', 'contract_code', 'date', 'hours'] })

            return this.success(res,{ users: users })

        } catch (e) {
            this.error(res, e)
        }
    }
}

module.exports = new userController()