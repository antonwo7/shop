const Controller = require('../controllers/Controller')
const optionService = require('../services/OptionService')
const {validationResult} = require('express-validator')
const CApiError = require("../classes/CApiError");
const {formidable} = require("formidable");


class optionController {
    async getOptions (req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(CApiError.badRequest('Get options error', errors.array()))
            }

            const options = await optionService.getOptions()

            return res.json(options)

        } catch(e) {
            next(e)
        }
    }

    async patchOption (req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(CApiError.badRequest('Patch options error', errors.array()))
            }

            const value = req.body.value
            const id = req.params.id

            await optionService.patchOption(id, value)

            return res.json({})

        } catch(e) {
            next(e)
        }
    }

    async patchFileOption (req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(CApiError.badRequest('Patch options error', errors.array()))
            }

            const id = req.params.id

            const form = formidable({})
            const [fields, files] = await form.parse(req)
            if (!files.files || !files.files.length) {
                return next(CApiError.badRequest('File list empty', errors.array()))
            }

            await optionService.patchFileOption(id, files.files[0])

            return res.json({})

        } catch(e) {
            console.log('e' ,e)
            next(e)
        }
    }
}

module.exports = new optionController()