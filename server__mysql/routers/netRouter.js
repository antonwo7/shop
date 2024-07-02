const authMiddleWare = require('../middlewares/authMiddleware')
const Router = require('express')
const {param} = require('express-validator')
const cors = require('cors')
const router = new Router()
const netController = require('../controllers/netController')
const {check} = require('express-validator')

router.get('/', [
    // authMiddleWare
], netController.getNets)

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