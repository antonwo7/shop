const Router = require('express')
const {param} = require('express-validator')
const cors = require('cors')
const router = new Router()
const productController = require('../controllers/productController')
const {userAuthMiddleware} = require("../middlewares/authMiddleware");
const {check} = require('express-validator')

router.get('/categories/', productController.getCategories)

router.get('/properties/', productController.getProperties)

router.post('/cart/', [
    check('cart').notEmpty(),
], productController.getCartProducts)

router.get('/', productController.getProducts)

router.get('/:id', [
    param('id').notEmpty(),
], productController.getProduct)

// router.post('/', [
//     check('name', 'Name error').notEmpty(),
//     check('sku', 'Sku error').notEmpty(),
//     check('description', 'Description error').notEmpty()
// ], productController.postProduct)
//
// router.delete('/:id', [], productController.deleteProduct)
//
// router.patch('/:id', [], productController.patchProduct)
//
// router.post('/:id/images', [
//     // userAuthMiddleware,
//     param('id').notEmpty(),
// ], productController.postImages)


module.exports = router