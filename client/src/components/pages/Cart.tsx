import React from 'react';
import ProductList from "../catalog/lists/ProductList";
import Page from "./Page";
import {useAppSelector} from "../../store/hooks";
import {productAPI} from "../../api/product";
import ProductCartList from "../catalog/lists/ProductCartList";

const Cart = () => {
    const cartItems = useAppSelector(state => state.common.cart)
    const {data: products, isLoading} = productAPI.useGetCartProductsQuery(cartItems)
    return (
        <Page>
            <main>
                <section className="container stylization maincont">
                    {products && <ProductCartList products={products} />}
                </section>
            </main>
        </Page>
    );
};

export default Cart;