const Option = require('../models/Option')
const imageService = require('../services/ImageService')
const CApiError = require("../classes/CApiError");
const config = require("../config");


class OptionService
{
    async getOptions() {
        return await Option.findAll({raw: true})
    }

    async patchOption(id, value) {
        return await Option.update({value}, {where: {id}})
    }

    async patchFileOption(id, file) {
        const fileName = await imageService.uploadImage(file)
        const option = await Option.findByPk(id)
        if (!option) throw CApiError.badRequest('Option unknown')

        option.value = fileName
        await option.save()
    }
}

module.exports = new OptionService()