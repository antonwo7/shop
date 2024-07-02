const jwt = require('jsonwebtoken')
const Token = require('../models/Token')
const Role = require('../models/Role')
const {roleNames} = require("../config");

class UserRoleService
{
    async getRoleNameById(roleId) {
        const role = await Role.findOne({ raw: true, where: { id: roleId }, attributes: ['name'] })
        if (!role) {
            return null;
        }

        return role.name
    }

    async getRoleIdByName(roleName) {
        const role = await Role.findOne({ raw: true, where: { name: roleName }, attributes: ['id'] })
        if (!role) {
            return null;
        }

        return role.id
    }
}

module.exports = new UserRoleService()