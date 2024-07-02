const netService = require('../services/NetService')
const {validationResult} = require('express-validator')
const CApiError = require("../classes/CApiError");


class netController {
    async getNets (req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(CApiError.badRequest('Get nets error', errors.array()))
            }

            const nets = await netService.getNets()

            return res.json(nets)

        } catch(e) {
            next(e)
        }
    }
}

module.exports = new netController()