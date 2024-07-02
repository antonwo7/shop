import React from 'react';
import {TProduct} from "../../../types/product";
import ProductImage from "./parts/ProductImage";
import ProductVariations from "./parts/ProductVariations";
import ProductProperties from "./parts/ProductProperties";

const ProductList = ({products}: {products: TProduct[]}) => {
    return (
        <div className="prod-items section-items">
            {products && products.map(product => <div className="prodlist-i" key={product._id}>
                <ProductImage product={product}/>
                <div className="prodlist-i-cont">
                    <h3><a href={`/catalog/${product._id}`}>{product.name}</a></h3>
                    <div className="prodlist-i-txt">{product.description}</div>
                    <ProductVariations product={product}/>
                </div>

                <ProductProperties product={product}/>
            </div>)}
        </div>
    );
};

export default ProductList;