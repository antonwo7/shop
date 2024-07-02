const Controller = require('../controllers/Controller')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const productService = require("../services/ProductService");
const imageService = require("../services/ImageService");
const CApiError = require("../classes/CApiError");
const CProduct = require("../classes/CProduct");
const {formidable} = require('formidable');

class productController extends Controller
{

    getProducts = async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty())
                return next(CApiError.badRequest('Get product error', errors.array()))

            let products = await productService.getProducts(req.query)

            return res.json(products)

        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    getProduct = async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty())
                return next(CApiError.badRequest('Get product error', errors.array()))

            const _id = req.params.id

            let product = await productService.getProduct(_id)

            return res.json(product)

        } catch (e) {
            next(e)
        }
    }

    getCategories = async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty())
                return next(CApiError.badRequest('Get categories error', errors.array()))

            let categories = await productService.getCategories()

            return res.json(categories)

        } catch (e) {
            next(e)
        }
    }

    getProperties = async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty())
                return next(CApiError.badRequest('Get properties error', errors.array()))

            let properties = await productService.getProperties()

            return res.json(properties)

        } catch (e) {
            next(e)
        }
    }

    getCartProducts = async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty())
                return next(CApiError.badRequest('Get cart products error', errors.array()))

            const cartData = JSON.parse(req.body.cart)
            if (!cartData)
                return next(CApiError.badRequest('Get cart products error'))

            console.log('cartData', cartData)

            let products = await productService.getCartProducts(cartData)

            return res.json(products)

        } catch (e) {
            next(e)
        }
    }

    // postProduct = async (req, res, next) => {
    //     try {
    //         const errors = validationResult(req)
    //         if (!errors.isEmpty())
    //             return next(CApiError.badRequest('Post product error', errors.array()))
    //
    //         const productObj = new CProduct(req.body)
    //
    //         await productService.postProduct(productObj)
    //         return res.json({})
    //
    //     } catch(e) {
    //         next(e)
    //     }
    // }
    //
    // deleteProduct = async (req, res) => {
    //
    // }
    //
    // patchProduct = async (req, res) => {
    //
    // }
    //
    // postImages = async (req, res, next) => {
    //     try {
    //         const errors = validationResult(req)
    //         if (!errors.isEmpty())
    //             return next(CApiError.badRequest('Post images error', errors.array()))
    //
    //         const _id = req.params.id
    //
    //         const form = formidable({})
    //         const [fields, files] = await form.parse(req)
    //
    //         const imageList = await imageService.postImages(files.files)
    //         await productService.postProductImages(_id, imageList)
    //         return res.json({})
    //
    //     } catch(e) {
    //         console.log(e)
    //         next(e)
    //     }
    // }

    // addUser = async (req, res) => {
    //     try {
    //         const errors = validationResult(req)
    //         if (!errors.isEmpty()) {
    //             return this.unsuccess(res,{ message: 'User adding error', errors: errors })
    //         }
    //
    //         const { username, password, name, nif, naf, contract_code, hours } = req.body
    //         const date = req.body.date ? paramToDate(req.body.date) : null
    //         const candidate = await User.findOne({ where: { username }, attributes: ['id', 'username'] })
    //         if (candidate) {
    //             return this.unsuccess(res,{ message: "User exist", candidate })
    //         }
    //
    //         const hashedPassword = bcrypt.hashSync(password, 7)
    //         const userRole = await Role.findOne({ where: { name: roleNames.user }, attributes: ['id', 'name'] })
    //         if (!userRole) {
    //             return this.unsuccess(res,{ message: "Role not exist" })
    //         }
    //
    //         await User.create({ username, password: hashedPassword, role: userRole.id, name, nif, naf, contract_code, date, hours  })
    //
    //         const users = await User.findAll({ raw: true, attributes: ['id', 'username', 'name', 'nif', 'naf', 'contract_code', 'date', 'hours'] })
    //
    //         return this.success(res,{ users: users })
    //
    //     } catch (e) {
    //         this.error(res, e)
    //     }
    // }
}

module.exports = new productController()