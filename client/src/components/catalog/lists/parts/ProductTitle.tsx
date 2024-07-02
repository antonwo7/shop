import React from 'react';
import {limit} from "../../../../utils/data";
import {TProduct} from "../../../../types/product";

const ProductTitle = ({product}: {product: TProduct}) => {
    return (
        <h3>
            <a href={`/catalog/${product._id}`}>{limit(product.name, 30)}</a>
        </h3>
    );
};

export default ProductTitle;