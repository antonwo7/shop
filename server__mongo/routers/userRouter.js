const authMiddleWare = require('../middlewares/authMiddleware')
const Router = require('express')
const cors = require('cors')
const router = new Router()
const userController = require('../controllers/userController')
const {check} = require('express-validator')

router.use(cors())

router.post('/add_user', [], userController.addUser)

module.exports = router