import React from 'react';
import {limit} from "../../../../utils/data";
import {TProduct, TProductVariation} from "../../../../types/product";

const ProductPrice = ({product, variation = null}: {product: TProduct, variation?: TProductVariation | null}) => {
    const getFormattedPrice = (price: number) => '€' + price.toFixed(2)

    const getProductPrice = () => {
        if (variation) {
            return getFormattedPrice(variation.price)
        }

        if (!product.variations || !product.variations.length) return 'off stock';
        let price = product.variations.reduce((min, variation) =>
            variation.price < min || min === 0 ? variation.price : min, 0)

        let formattedPrice = getFormattedPrice(price)

        return product.variations.length > 1
            ? `from ${formattedPrice}`
            : formattedPrice
    }

    return (
        <p className="prod-i-price">
            <b>{getProductPrice()}</b>
        </p>
    );
};

export default ProductPrice;