const netService = require('../services/NetService')
const {validationResult} = require('express-validator')
const CApiError = require("../classes/CApiError");
const config = require("../config");

class assetController {
    async getFile (req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(CApiError.badRequest('Get asset error', errors.array()))
            }

            const filename = req.params.filename

            return res.download(config.paths.image + filename)

        } catch(e) {
            next(e)
        }
    }
}

module.exports = new assetController()