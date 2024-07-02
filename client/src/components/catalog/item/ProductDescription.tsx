import React from 'react';
import {TProduct} from "../../../types/product";

const ProductDescription = ({product}: {product: TProduct}) => {
    return (
        <div className="prod-cont-txt">
            {product.description}
        </div>
    );
};

export default ProductDescription;