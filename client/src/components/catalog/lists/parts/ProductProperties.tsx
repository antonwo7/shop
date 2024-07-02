import React from 'react';
import {TProduct} from "../../../../types/product";

const ProductProperties = ({product}: {product: TProduct}) => {
    return (
        <div className="prod-i-props-wrap">
            <ul className="prod-i-props">
                {product.properties && product.properties.map(property => <li key={property._id}>
                    <b>{property.name}</b>{' '}
                    {property.value}
                </li>)}
            </ul>
        </div>
    );
};

export default ProductProperties;