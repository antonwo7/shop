const Sequelize = require('sequelize');

const QueryTypes = require('sequelize');
const Controller = require('../controllers/Controller')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const Product = require("../models/Product")
const ProductVariation = require("../models/ProductVariation");
const ProductPropertyValue = require("../models/ProductPropertyValue");
const ProductProperty = require("../models/ProductProperty");
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

            let products = await productService.getProducts()

            return res.json(products)

        } catch (e) {
            next(e)
        }
    }

    getProduct = async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty())
                return next(CApiError.badRequest('Get product error', errors.array()))

            const { id } = req.params

            let product = productService.getProduct(id)

            return res.json(product)

        } catch (e) {
            next(e)
        }
    }

    postProduct = async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty())
                return next(CApiError.badRequest('Post product error', errors.array()))

            const productObj = new CProduct(req.body)

            await productService.postProduct(productObj)
            return res.json({})

        } catch(e) {
            next(e)
        }
    }

    deleteProduct = async (req, res) => {

    }

    patchProduct = async (req, res) => {

    }

    postImages = async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty())
                return next(CApiError.badRequest('Post images error', errors.array()))

            const id = req.params.id

            const form = formidable({})
            const [fields, files] = await form.parse(req)

            const imageList = await imageService.postImages(files.files)
            await productService.postProductImages(id, imageList)
            return res.json({})

        } catch(e) {
            console.log(e)
            next(e)
        }
    }

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