const {adminAuthMiddleware} = require('../middlewares/authMiddleware')
const Router = require('express')
const {param} = require('express-validator')
const router = new Router()
const optionController = require('../controllers/optionController')
const {check, files} = require('express-validator')

router.get('/', [], optionController.getOptions)

router.patch('/:id', [
   adminAuthMiddleware,
    check('value', 'Value error').notEmpty(),
], optionController.patchOption)

router.patch('/:id/files', [
    adminAuthMiddleware,
    check('id', 'Id error').notEmpty(),
], optionController.patchFileOption)


// router.get('/:id', [
//     param('id').notEmpty(),
//     // authMiddleWare
// ], productController.getProduct)
//
// router.post('/', [
//     check('name', 'Name error').notEmpty(),
//     check('sku', 'Sku error').notEmpty(),
//     check('description', 'Description error').notEmpty()
// ], productController.postProduct)
//
// router.delete('/:id', [], productController.deleteProduct)
//
// router.patch('/:id', [], productController.patchProduct)

module.exports = router