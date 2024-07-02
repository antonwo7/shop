const Product = require("../models/Product")
const ProductImage = require("../models/ProductImage")
const ProductProperty = require("../models/ProductProperty");
const ProductPropertyValue = require("../models/ProductPropertyValue");
const ProductVariation = require("../models/ProductVariation");
const CApiError = require("../classes/CApiError");

class ProductService
{
    async getProducts() {
        let products = await Product.findAll({
            attributes: ['id', 'name', 'description'],
            raw: false,
            include: [
                {
                    model: ProductImage,
                    as: 'images',
                    attributes: ['id', 'name'],
                },
                {
                    model: ProductVariation,
                    as: 'variations',
                    attributes: ['id', 'quantity', 'price'],
                    include: {
                        through: { attributes: [] },
                        model: ProductPropertyValue,
                        as: 'properties',
                        attributes: {
                            include: [
                                ['product_property_id', 'id'],
                                ['id', 'value_id'],
                                ['value', 'value'],
                            ],
                            exclude: ['created_at', 'updated_at', 'id', 'value', 'product_property_id']
                        },
                        include: {
                            model: ProductProperty,
                            as: 'property',
                            attributes: ['name'],
                        }
                    }
                },
                {
                    model: ProductPropertyValue,
                    as: 'properties',
                    through: { attributes: [] },
                    attributes: {
                        include: [
                            ['product_property_id', 'id'],
                            ['id', 'value_id'],
                            ['value', 'value'],
                        ],
                        exclude: ['created_at', 'updated_at', 'id', 'value', 'product_property_id']
                    },
                    include: {
                        model: ProductProperty,
                        as: 'property',
                        attributes: ['name'],
                    }
                }
            ]
        }).then(res => res.map(el => el.get({ plain: true })))

        const converter = (item, i) => {
            item.name = item.property.name
            delete item.property
        }

        products.forEach(product => {
            if (product.variations)
                product.variations.forEach((v, vi) => {
                    if (v.properties) {
                        v.properties.forEach(converter)
                    }
                })

            if (product.properties) {
                product.properties.forEach(converter)
            }
        })

        products.forEach(product => {
            if (product.variations) {
                product.variations.forEach((v, vi) => {
                    if (v.property_values) {
                        v.property_values.forEach((pv, pvi) => {
                            product.variations[vi].property_values[pvi].property_name = pv.property.name
                            delete product.variations[vi].property_values[pvi].property
                        })
                    }
                })
            }
        })

        return products;
    }

    async getProduct(id) {
        const product = await Product.findByPk(id, {
            attributes: ['id', 'name', 'description'],
            raw: false,
            include: [
                {
                    model: ProductVariation,
                    as: 'variations',
                    attributes: ['id', 'quantity', 'price'],
                    include: {
                        through: { attributes: [] },
                        model: ProductPropertyValue,
                        as: 'properties',
                        attributes: {
                            include: [
                                ['product_property_id', 'property_id'],
                                ['id', 'property_value_id'],
                                ['value', 'property_value'],
                            ],
                            exclude: ['created_at', 'updated_at', 'id', 'value', 'product_property_id']
                        },
                        include: {
                            model: ProductProperty,
                            as: 'property',
                            attributes: ['name'],
                        }
                    }
                },
                {
                    model: ProductPropertyValue,
                    as: 'properties',
                    through: { attributes: [] },
                    attributes: {
                        include: [
                            ['product_property_id', 'property_id'],
                            ['id', 'property_value_id'],
                            ['value', 'property_value'],
                        ],
                        exclude: ['created_at', 'updated_at', 'id', 'value', 'product_property_id']
                    },
                    include: {
                        model: ProductProperty,
                        as: 'property',
                        attributes: ['name'],
                    }
                }
            ]
        }).then(product => product.get({ plain: true }))

        if (!product)
            throw CApiError.badRequest('Product not found')

        const converter = (item, i) => {
            item.property_name = item.property.name
            delete item.property
        }

        product.variations.forEach((v, vi) => {
            if (v.properties) {
                v.properties.forEach(converter)
            }
        })

        product.properties.forEach(converter)

        return product;
    }

    async postProduct(productObj) {
        return await Product.create(productObj.plain())
    }

    async postProductImages(id, images) {
        return await ProductImage.bulkCreate(
            images.reduce(image => ({
                name: image,
                product_id: id
            }), [])
        )
    }
}

module.exports = new ProductService()