const {ObjectId} = require('bson')
const Option = require('../models/Option')
const imageService = require('../services/ImageService')
const CApiError = require("../classes/CApiError")


class OptionService
{
    async getOptions() {
        return Option.find({})
    }

    async patchOption(_id, value) {
        return Option.updateOne({_id: new ObjectId(_id)}, {value})
    }

    async patchFileOption(_id, file) {
        const fileName = await imageService.uploadImage(file)
        const option = await Option.findOne({_id: new ObjectId(_id)})
        if (!option) {
            throw CApiError.badRequest('Option unknown')
        }

        option.value = fileName
        await option.save()
    }
}

module.exports = new OptionService()