import React from 'react';
import Page from "./Page";
import ProductImages from '../catalog/item/ProductImages';
import ProductDescription from "../catalog/item/ProductDescription";
import ProductVariations from "../catalog/lists/parts/ProductVariations";
import ProductProperties from "../catalog/lists/parts/ProductProperties";
import {productAPI} from "../../api/product";

const Product = () => {
    const {data: product, isLoading} = productAPI.useGetProductQuery('6618faeaf87ae4bca74c2230')
    if (!product) return <></>

    return (
        <Page>
            <main>
                <section className="container">
                    <div className="prod-wrap">
                        <ProductImages product={product} />

                        <div className="prod-cont prod-items">
                            <h2>{product.name}</h2>
                            <ProductDescription product={product} />
                            <ProductVariations product={product} />
                            <ProductProperties product={product} />
                        </div>
                    </div>
                </section>
            </main>
        </Page>
    );
};

export default Product;