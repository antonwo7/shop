import {createApi} from "@reduxjs/toolkit/query/react";
import {buildBaseQuery} from "./services/baseQuery";
import {TCategory, TProduct, TProductProperty} from "../types/product";
import {TFilterState} from "../store/reducers/filterSlice";
import {buildParams} from "../utils/request";
import {TCartItems} from "../store/reducers/commonSlice";

export const productAPI = createApi({
    reducerPath: 'productAPI',
    baseQuery: buildBaseQuery({
        baseUrl: `${process.env['REACT_APP_API_URL']}/products`,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<any, TFilterState | void>({
            query: (params) => {
                const paramsStr = params ? `?${buildParams(params).toString()}` : ''
                return {
                    url: `/${paramsStr}`,
                    method: 'GET',
                }
            },
        }),

        getProduct: builder.query<TProduct, string>({
            query: (productId) => ({
                url: `/${productId}`,
                method: 'GET'
            }),
        }),

        getCartProducts: builder.query<TProduct[], TCartItems>({
            query: (data) => ({
                url: `/cart`,
                method: 'POST',
                body: {cart: JSON.stringify(data)}
            }),
        }),

        getCategories: builder.query<TCategory[], void>({
            query: () => ({
                url: `/categories`,
                method: 'GET'
            }),
        }),

        getProperties: builder.query<TProductProperty[], void>({
            query: () => ({
                url: `/properties`,
                method: 'GET'
            }),
        }),
    })
})