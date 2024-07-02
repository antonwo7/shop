import React from 'react';
import ProductCardList from '../catalog/lists/ProductCardList';
import Page from "./Page";
import {productAPI} from "../../api/product";

const Index = () => {
    const {data: products} = productAPI.useGetProductsQuery()
    return (
        <Page>
            <main>
                <section className="container">
                    <div className="section-cont section-full">
                        <ProductCardList products={products} />
                    </div>
                </section>
            </main>
        </Page>
    );
};

export default Index;