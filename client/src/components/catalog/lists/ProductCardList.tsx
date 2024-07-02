import React from 'react';
import {TProduct} from "../../../types/product";
import ProductTitle from "./parts/ProductTitle";
import ProductImage from "./parts/ProductImage";
import ProductPrice from "./parts/ProductPrice";

type TProductCardList = {
    products: TProduct[]
}

const ProductCardList = ({products}: TProductCardList) => {
    return (
        <div className="prod-items section-items">
            {products && products.map(product => <div className="prod-i" key={product._id}>
                <div className="prod-i-top">
                    <ProductImage product={product}/>
                    <a href="#" className="prod-i-buy">Add to cart</a>
                </div>
                <ProductTitle product={product} />
                <ProductPrice product={product} />
            </div>)}
        </div>
    );
};

export default ProductCardList;