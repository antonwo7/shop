const {ObjectId} = require("bson")
const Product = require("../models/Product")
const ProductCategory = require("../models/ProductCategory")
const ProductProperty = require("../models/ProductProperty")
const mongoose = require("mongoose")

class ProductService
{
    normalizeProperties(properties) {
        let normalizedProperties;
        switch (typeof properties) {
            case 'undefined' : normalizedProperties = []; break;
            case 'string' : normalizedProperties = [new ObjectId(properties)]; break;
            case 'object' : normalizedProperties = properties.map(p => new ObjectId(p)); break;
        }
        return normalizedProperties;
    }

    async getCartProducts(cartData) {
        const variationIds = Object.keys(cartData).map(p => new ObjectId(p))
        const products = await Product.aggregate( [
            {
                $lookup: {
                    from: "product_images",
                    localField: "images",
                    foreignField: "_id",
                    as: "images"
                },
            },
            {
                $lookup: {
                    from: "product_variations",
                    localField: "variations",
                    foreignField: "_id",
                    as: "variations",
                    pipeline: [
                        {
                            $lookup: {
                                from: "product_properties",
                                localField: "properties",
                                foreignField: "_id",
                                as: "properties"
                            }
                        },
                        {
                            $project: {
                                product: 0,
                            }
                        },
                    ]
                }
            },
            {
                $match: {
                    $and: [
                        {"variations._id": {$in: variationIds} }
                    ],
                }
            },
            {
                $project: {
                    "name": 1, "sku": 1, "description": 1,
                    "images": 1,
                    "variations": {
                        $filter: {
                            "input": "$variations",
                            "as": "variation",
                            "cond": {
                                $and: [
                                    {$in: ["$$variation._id", variationIds]}
                                ]
                            }
                        }
                    },
                }
            }
        ] )

        return products;
    }

    async getProducts(params) {
        let {priceMin, priceMax, properties, categories} = params
        properties = this.normalizeProperties(properties)
        categories = this.normalizeProperties(categories)

        return Product.aggregate( [
            {
                $lookup: {
                    from: "product_images",
                    localField: "images",
                    foreignField: "_id",
                    as: "images"
                },
            },
            {
                $lookup: {
                    from: "product_properties",
                    localField: "properties",
                    foreignField: "_id",
                    as: "properties"
                },
            },
            {
                $lookup: {
                    from: "product_variations",
                    localField: "variations",
                    foreignField: "_id",
                    as: "variations",
                    pipeline: [
                        {
                            $lookup: {
                                from: "product_properties",
                                localField: "properties",
                                foreignField: "_id",
                                as: "properties"
                            }
                        },
                        {
                            $project: {
                                product: 0,
                            }
                        },
                    ]
                }
            },
            {
                $lookup: {
                    from: "product_categories",
                    localField: "categories",
                    foreignField: "_id",
                    as: "categories"
                },
            },
            {
                $match: {
                    $and: [
                        {"variations.price": {$lte: priceMax ? +priceMax : 10000}},
                        {"variations.price": {$gte: priceMin ? +priceMin : 0}},
                        {"properties._id": properties.length ? {$in: properties} : {$exists: true}},
                        {"categories._id": categories.length ? {$in: categories} : {$exists: true}},
                    ],
                }
            },
            {
                $project: {
                    "name": 1, "sku": 1, "description": 1,
                    "images": 1,
                    "properties": 1,
                    "categories": 1,
                    "variations": {
                        $filter: {
                            "input": "$variations",
                            "as": "variation",
                            "cond": {
                                $and: [
                                    {$lte: ["$$variation.price", priceMax ? +priceMax : 10000]},
                                    {$gte: ["$$variation.price", priceMin ? +priceMin : 0]}
                                ]
                            }
                        }
                    }
                }
            }
            // $arrayElemAt: ["$child", 0]
        ] )
    }

    async getProduct(_id) {
        const products = await Product.aggregate( [
            {
                $match : {_id : new ObjectId(_id)}
            },
            {
                $lookup: {
                    from: "product_images",
                    localField: "images",
                    foreignField: "_id",
                    as: "images"
                },
            },
            {
                $lookup: {
                    from: "product_properties",
                    localField: "properties",
                    foreignField: "_id",
                    as: "properties"
                },
            },
            {
                $lookup: {
                    from: "product_variations",
                    localField: "_id",
                    foreignField: "product",
                    as: "variations",
                    let: { products: "$variations" },
                    pipeline: [
                        {
                            $lookup: {
                                from: "product_properties",
                                localField: "properties",
                                foreignField: "_id",
                                as: "properties"
                            }
                        },
                        {
                            $project: {
                                product: 0
                            }
                        }
                    ]
                },
            },
            {
                $limit: 1
            }
        ])

        if (!products.length) return null;

        return products[0]
    }

    async getCategories() {
        return ProductCategory.aggregate([
            {
                $match: {
                    parent_id: {
                        $exists: false
                    }
                }
            },
            {
                $graphLookup: {
                    from: "product_categories",
                    startWith: "$_id",
                    connectFromField: "_id",
                    connectToField: "parent_id",
                    as: "categories"
                }
            },
            {
                $project: {
                    'categories.parent_id': 0
                }
            }
        ])
    }

    async getProperties() {
        return ProductProperty.find({ is_static: true })
    }

    //
    // async postProduct(productObj) {
    //     return await Product.create(productObj.plain())
    // }
    //
    // async postProductImages(id, images) {
    //     return await ProductImage.bulkCreate(
    //         images.reduce(image => ({
    //             name: image,
    //             product_id: id
    //         }), [])
    //     )
    // }
}

module.exports = new ProductService()