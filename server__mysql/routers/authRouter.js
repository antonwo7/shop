const Router = require('express')
const router = new Router()
const authController = require('../controllers/authController')
const authMiddleWare = require('../middlewares/authMiddleware')
const {userAuthMiddleware} = require("../middlewares/authMiddleware");
const {body, check} = require('express-validator')

router.post('/registration', [
    body('email', 'Email error').notEmpty().isEmail(),
    body('password', 'Password error').notEmpty().isLength({min: 5}),
    body('name', 'Name error').notEmpty()
], authController.registration)

router.post('/login', [
    body('email', 'Email error').notEmpty(),
    body('password', 'Password error').notEmpty().isLength({min: 5}),
], authController.login)

router.post('/logout', authController.logout)

router.get('/activate/:link', authController.activate)

router.post('/refresh', authController.refresh)

router.post('/validate', [
    userAuthMiddleware
], authController.validate)

module.exports = router