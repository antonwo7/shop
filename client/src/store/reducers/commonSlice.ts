import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {TAuthUser} from "../../types/user";
import config from "../../config";

export type TCartItems = {[id: string]: number}

export type TCart = {
    id: string
    quantity: number
}

export type TCommonState = {
    authUser: TAuthUser | null
    isLoading: boolean
    cart: TCartItems
}

const initialState: TCommonState = {
    authUser: null,
    isLoading: false,
    cart: {}
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setAuthUserAction: (state, action: PayloadAction<TAuthUser | null>) => {
            state.authUser = action.payload
        },
        setLoadingAction: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        addToCartAction: (state, action: PayloadAction<TCart>) => {
            const newCount = state.cart[action.payload.id]
                ? state.cart[action.payload.id] + action.payload.quantity
                : action.payload.quantity

            const newState = {...state.cart, [action.payload.id]: newCount}
            localStorage.setItem(config.localStorage.cartName, JSON.stringify(newState))
            state.cart = newState
        },
        changeCartItemAction: (state, action: PayloadAction<TCart>) => {
            if (!state.cart[action.payload.id]) return;
            const newState = {...state.cart, [action.payload.id]: action.payload.quantity}
            localStorage.setItem(config.localStorage.cartName, JSON.stringify(newState))
            state.cart = newState
        },
        removeCartItemAction: (state, action: PayloadAction<string>) => {
            if (!state.cart[action.payload]) return;
            const stateCart = {...state.cart}
            delete stateCart[action.payload]
            const newState = {...stateCart}
            localStorage.setItem(config.localStorage.cartName, JSON.stringify(newState))
            state.cart = newState
        },
        clearCartAction: (state) => {
            localStorage.removeItem(config.localStorage.cartName)
            state.cart = {}
        },
        loadCartItems: (state) => {
            const cartItemsString = localStorage.getItem(config.localStorage.cartName)
            if (!cartItemsString) return;
            const cartItems = JSON.parse(cartItemsString)
            if (!cartItems) return;
            state.cart = cartItems
        },
    }
})

export const {setAuthUserAction, setLoadingAction, addToCartAction, changeCartItemAction, removeCartItemAction, loadCartItems, clearCartAction} = commonSlice.actions
export default commonSlice.reducer