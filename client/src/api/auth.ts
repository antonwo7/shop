import {createApi} from "@reduxjs/toolkit/query/react";
import {setLoadingAction, setAuthUserAction} from "../store/reducers/commonSlice"
import {TAuthUser} from "../types/user";
import config from "../config";
import {buildBaseQuery} from "./services/baseQuery";

type TAuth = {
    user: TAuthUser
    access: string
    refresh: string
}

type TLoginRequest = {
    email: string
    password: string
}

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: buildBaseQuery({
        baseUrl: `${process.env['REACT_APP_API_URL']}/auth`,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        login: builder.mutation<TAuth, TLoginRequest>({
            query: (loginData) => ({
                url: '/login',
                method: 'POST',
                body: loginData
            }),
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                const {data} = await queryFulfilled
                if (data) {
                    dispatch(setAuthUserAction(data.user))
                    localStorage.setItem(config.localStorage.accessTokenName, data.access)
                }
            }
        }),

        registration: builder.mutation<TAuth, TLoginRequest>({
            query: (registrationData) => ({
                url: '/registration',
                method: 'POST',
                body: registrationData
            }),
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                const {data} = await queryFulfilled
                if (data) {
                    dispatch(setAuthUserAction(data.user))
                    localStorage.setItem(config.localStorage.accessTokenName, data.access)
                }
            }
        }),

        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(config.localStorage.accessTokenName)
                },
            }),
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                await queryFulfilled
                dispatch(setAuthUserAction(null))
                localStorage.removeItem(config.localStorage.accessTokenName)
            }
        }),

        refresh: builder.mutation<TAuth, void>({
            query: () => ({
                url: '/refresh',
                method: 'POST'
            }),
        }),

        validate: builder.mutation<TAuth, void>({
            query: () => ({
                url: '/validate',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(config.localStorage.accessTokenName)
                },
            }),
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                const {data} = await queryFulfilled
                if (data) {
                    dispatch(setAuthUserAction(data.user))
                }
            }
        }),
    })
})