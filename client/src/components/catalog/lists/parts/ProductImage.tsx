import React from 'react';
import {TProduct} from "../../../../types/product";
import {apiUri} from "../../../../utils/request";

const defaultProductImageUrl = 'http://placehold.it/378x300'

const ProductImage = ({product}: {product: TProduct}) => {
    const getProductImageUrl = () => {
        return product.images.length
            ? apiUri(product.images[0].name)
            : defaultProductImageUrl
    }
    return (
        <a className="prod-i-img" href={`/catalog/${product._id}`}>
            <img src={getProductImageUrl()} alt={product.name} />
        </a>
    );
};

export default ProductImage;