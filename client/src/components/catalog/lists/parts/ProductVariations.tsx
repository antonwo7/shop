import React, {ChangeEvent, useMemo, useState, MouseEvent} from 'react';
import {TProduct, TProductProperty, TProductVariation} from "../../../../types/product";
import ProductPrice from "./ProductPrice";
import {addToCartAction} from "../../../../store/reducers/commonSlice"
import {useAppDispatch} from "../../../../store/hooks";

const includesAll = (arr: any[], values: any[]) => values.every(v => arr.includes(v))

type TProductProperties = {[key: string]: string | number}

const ProductVariations = ({product}: {product: TProduct}) => {
    const [state, setState] = useState<TProductProperties>({})
    const [quantity, setQuantity] = useState<number>(1)
    const [variation, setVariation] = useState<TProductVariation | null>(null)
    const dispatch = useAppDispatch()

    const getUniquePropertyNames = () => {
        if (!product.variations) return {};
        const objProps = product.variations.reduce((acc: {[key: string]: {[key: string]: string}}, cur) => {

            const properties = cur.properties

            properties.forEach(property => {
                if (!(property.name in acc)) {
                    acc[property.name] = {[property._id]: property.value}
                } else if (!(property._id in acc[property.name])) {
                    acc[property.name] = {...acc[property.name], [property._id]: property.value}
                }
            })

            return acc;
        }, {})

        setState(Object.keys(objProps).reduce((acc, key) => {
            acc[key] = ''
            return acc;
        }, {} as TProductProperties))

        return objProps;
    }

    const propertiesWithValues: {[key: string]: {[key: string]: string}} = useMemo(() => {
        return getUniquePropertyNames()
    }, [])

    const changePropertyHandler = (propertyName: string, propertyValue: string | number) => {
        const newState = {
            ...state,
            [propertyName]: propertyValue
        }

        const isStateFilled = !Object.values(newState).includes('')

        let foundVariation = null

        if (isStateFilled) {
            const stateIds = Object.values(newState)
            for (let v of product.variations) {
                const propertiesIds = v.properties.map(p => p._id)
                if (includesAll(propertiesIds, stateIds)) {
                    foundVariation = v
                }
            }
        }

        setVariation(foundVariation)
        setState(newState)
    }

    const changeCountHandler = (e: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const buttonType = e.currentTarget.dataset.button
        let value = quantity;
        switch (buttonType) {
            case undefined: 'value' in e.currentTarget && (value = +e.currentTarget.value); break;
            case 'inc': value = quantity + 1; break;
            case 'dec': value = quantity - 1; break;
        }
        value && setQuantity(value)
    }

    const addToCartHandler = () => {
        variation && dispatch(addToCartAction({
            id: variation._id,
            quantity
        }))
    }

    return (
        <>
            <div className="prod-i-skuwrap">
                {Object.keys(propertiesWithValues).map((prop: string, index) => <div key={index} className="prodlist-i-skuitem">
                    <p className="prodlist-i-skuttl">{prop}</p>
                    <div className="offer-props-select">
                        <select name="" value={state[prop] || undefined} onChange={(e) =>
                            changePropertyHandler(prop, e.target.value)}
                        >
                            <option value="" />
                            {Object.keys(propertiesWithValues[prop]).map((propValue: string, i) =>
                                <option key={i} value={propValue}>{propertiesWithValues[prop][propValue]}</option>)}
                        </select>
                    </div>
                </div>)}
            </div>
            <div className="prod-i-action">
                <p className="prodlist-i-qnt">
                    <input value={quantity} type="text" onChange={changeCountHandler} />
                    <a href="#" className="prodlist-i-plus" data-button="inc" onClick={changeCountHandler}><i className="fa fa-angle-up" /></a>
                    <a href="#" className="prodlist-i-minus" data-button="dec" onClick={changeCountHandler}><i className="fa fa-angle-down" /></a>
                </p>
                <p className="prodlist-i-addwrap">
                    <button className="prodlist-i-add" disabled={!variation} onClick={addToCartHandler}>Add to cart</button>
                </p>
                <ProductPrice product={product} variation={variation} />
            </div>
        </>
    );
};

export default ProductVariations;