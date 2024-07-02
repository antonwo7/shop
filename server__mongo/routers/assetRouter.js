const Router = require('express')
const {param} = require('express-validator')
const router = new Router()
const assetController = require('../controllers/assetController')

router.get('/images/:filename', [
    param('filename').notEmpty()
], assetController.getFile)

module.exports = router