import React, {ChangeEvent, MouseEvent} from 'react';
import {TProduct, TProductVariation} from "../../../types/product";
import ProductImage from "./parts/ProductImage";
import ProductVariations from "./parts/ProductVariations";
import ProductProperties from "./parts/ProductProperties";
import {productAPI} from "../../../api/product";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import ProductPrice from "./parts/ProductPrice";
import {changeCartItemAction, removeCartItemAction, clearCartAction} from "../../../store/reducers/commonSlice"

const ProductCartList = ({products}: {products: TProduct[]}) => {

    const dispatch = useAppDispatch()
    const cartItems = useAppSelector(state => state.common.cart)

    const getTotal = () => {
        return products
            .reduce((acc, product) => product.variations[0].price * cartItems[product.variations[0]._id], 0)
            .toFixed(2)
    }

    const changeQuantityHandler = (e: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const variationId = e.currentTarget.dataset.variation
        let quantity;
        if (!variationId || !cartItems[variationId]) return;
        const buttonType = e.currentTarget.dataset.button

        switch (buttonType) {
            case undefined: 'value' in e.currentTarget && (quantity = +e.currentTarget.value); break;
            case 'inc': quantity = cartItems[variationId] + 1; break;
            case 'dec': quantity = cartItems[variationId] - 1; break;
        }

        quantity && dispatch(changeCartItemAction({
            id: variationId,
            quantity: +quantity
        }))
    }

    const getVariationSumma = (variation: TProductVariation) => {
        return (cartItems[variation._id] * variation.price).toFixed(2)
    }

    const removeCartItemHandler = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const variationId = e.currentTarget.dataset.variation
        if (!variationId || !cartItems[variationId]) return;
        dispatch(removeCartItemAction(variationId))
    }

    const clearCartHandler = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        dispatch(clearCartAction())
    }

    return (
        <>
            <div className="cart-items-wrap">
                <table className="cart-items">
                    <thead>
                    <tr>
                        <td className="cart-image">Photo</td>
                        <td className="cart-ttl">Products</td>
                        <td className="cart-price">Price</td>
                        <td className="cart-quantity">Quantity</td>
                        <td className="cart-summ">Summ</td>
                        <td className="cart-del">&nbsp;</td>
                    </tr>
                    </thead>
                    <tbody>
                        {products && products.map(product => product.variations[0] && cartItems[product.variations[0]._id] && <tr key={product._id}>
                            <td className="cart-image">
                                <ProductImage product={product}/>
                            </td>
                            <td className="cart-ttl">
                                <a href={`/catalog/${product._id}`}>{product.name}</a>
                                {product.variations[0].properties && product.variations[0].properties.map((property, i) => (
                                    <p key={i}>{property.name}: {property.value}</p>
                                ))}
                            </td>
                            <td className="cart-price">
                                <ProductPrice product={product} variation={product.variations[0]} />
                            </td>
                            <td className="cart-quantity">
                                <p className="cart-qnt">
                                    <input value={cartItems[product.variations[0]._id]} type="number" data-variation={product.variations[0]._id} onChange={changeQuantityHandler} />
                                    <a href="#" className="cart-plus" data-button="inc" onClick={changeQuantityHandler} data-variation={product.variations[0]._id}><i className="fa fa-angle-up" /></a>
                                    <a href="#" className="cart-minus" data-button="dec" onClick={changeQuantityHandler} data-variation={product.variations[0]._id}><i className="fa fa-angle-down" /></a>
                                </p>
                            </td>
                            <td className="cart-summ">
                                <b>{getVariationSumma(product.variations[0])}</b>
                            </td>
                            <td className="cart-del">
                                <a href="#" className="cart-remove" data-variation={product.variations[0]._id} onClick={removeCartItemHandler} />
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            <ul className="cart-total">
                <li className="cart-summ">TOTAL: <b>{getTotal()}</b></li>
            </ul>
            <div className="cart-submit">
                <a href="#" className="cart-submit-btn">Checkout</a>
                <a href="#" className="cart-clear" onClick={clearCartHandler}>Clear cart</a>
            </div>
        </>
    );
};

export default ProductCartList;