import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import config from "../../config";
import {authAPI} from "../auth";
import {setAuthUserAction} from "../../store/reducers/commonSlice";
import {TAuth} from "../../types/response";
import {setErrorAction} from "../../store/reducers/messageSlice";
import {FetchBaseQueryArgs} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

export const buildBaseQuery = (params: FetchBaseQueryArgs) => {
    const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
        const baseQuery = fetchBaseQuery(params)
        let result = await baseQuery(args, api, extraOptions)
        if (result.error && result.error.status === 401) {
            try {
                const refreshResult = await baseQuery({
                    url: `${process.env['REACT_APP_API_URL']}/auth/refresh`,
                    method: 'POST',
                }, api, extraOptions)

                if (refreshResult.data) {
                    const userData = refreshResult.data as TAuth
                    api.dispatch(setAuthUserAction(userData.user))
                    localStorage.setItem(config.localStorage.accessTokenName, userData.access)
                    if (typeof args === 'object' && 'headers' in args) {
                        args.headers = {
                            ...args.headers,
                            'Authorization': 'Bearer ' + userData.access
                        }
                    }
                    result = await baseQuery(args, api, extraOptions)
                } else {
                    // await api.dispatch(authAPI.endpoints.logout.initiate())
                    throw new Error('User not registered')
                }
            } catch (e: any) {
                // api.dispatch(setErrorAction(e.error?.data?.message || e.error?.message || 'Unknown error'))
                result = {data: null}
            }
        }
        return result
    }

    return customBaseQuery;
}

// export const baseQueryWithAuth = fetchBaseQuery({
//     baseUrl: `${process.env['REACT_APP_API_URL']}/products`,
//     credentials: 'include',
//     prepareHeaders: (headers: Headers, {getState}: {getState: any}) => {
//         headers.set('Content-Type', 'application/json;charset=UTF-8')
//
//         const token = localStorage.getItem(config.localStorage.accessTokenName)
//         if (token) {
//             headers.set('Authorization', `Bearer ${token}`)
//         }
//     }
// })
// export const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
//     let result = await baseQueryWithAuth(args, api, extraOptions)
//     if (result?.error?.status === 401) {
//         if (await refreshHandler(api.dispatch)) {
//             result = await baseQueryWithAuth(args, api, extraOptions)
//         }
//     }
//     return result
// }
//
// export const refreshHandler = async (dispatch: any) => {
//     try {
//         let result = await dispatch(authAPI.endpoints.refresh.initiate())
//         if (result) {
//             const data = (result as {data: TAuth}).data
//             dispatch(setAuthUserAction(data.user))
//             localStorage.setItem(config.localStorage.accessTokenName, data.access)
//             return true;
//         } else {
//             localStorage.removeItem(config.localStorage.accessTokenName)
//             dispatch(setAuthUserAction(null))
//             dispatch(setErrorAction('User unauthorized'))
//             return false;
//         }
//     } catch (e) {
//         const error = e as any
//         localStorage.removeItem(config.localStorage.accessTokenName)
//         dispatch(setAuthUserAction(null))
//         dispatch(setErrorAction(error.error?.data?.message || error.error?.message || 'Unknown error'))
//         return false;
//     }
// }