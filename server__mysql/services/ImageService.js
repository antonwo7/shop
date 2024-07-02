const fs = require('fs')
const sharp = require('sharp')
const config = require('../config')
const {v4: uuid} = require('uuid')

class ImageService
{
    ext = 'jpg'

    async postImages(files) {
        const imageNames = []

        for (let file of files) {
            imageNames.push(await this.uploadImage(file))
        }

        return imageNames;
    }

    async uploadImage(file) {
        const buffer = await sharp(file.filepath).toFormat(this.ext).toBuffer()
        const fileName = uuid() + '.' + this.ext
        const fileUri = config.uris.image + fileName
        const fullFileName = config.paths.image + fileName
        const fd = fs.openSync(fullFileName, "w+")
        fs.writeSync(fd, buffer, 0, 'utf8')

        return fileUri
    }
}

module.exports = new ImageService()