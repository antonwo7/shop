import {isRejectedWithValue, MiddlewareAPI, Middleware} from "@reduxjs/toolkit";
import {authAPI} from "../auth";
import {store} from "../../store/store"
import {setAuthUserAction} from "../../store/reducers/commonSlice";
import config from "../../config";
import {TAuth} from "../../types/response";
import {setErrorAction} from "../../store/reducers/messageSlice";

// export const tokenRefresher = ({dispatch}: Record<any, any>) =>
//         (next: any) =>
//             async (action: any) => {
//                 if (isRejectedWithValue(action)) {
//                     if (action.payload.status === 401) {
//                         console.warn('We got a rejected action!')
//                         await dispatch(authAPI.endpoints.refresh.initiate())
//                     }
//                 }
//
//                 return next(action);
//             };


export const tokenRefresher: Middleware =
    (api: MiddlewareAPI) => (next) => async (action: any) => {
        if (isRejectedWithValue(action)) {
            try {
                if (action.payload.status === 401) {
                    const refreshResult = await store.dispatch(authAPI.endpoints.refresh.initiate())
                    console.log('refreshResult')
                    if ('data' in refreshResult) {
                        store.dispatch(setAuthUserAction(refreshResult.data.user))
                        localStorage.setItem(config.localStorage.accessTokenName, refreshResult.data.access)
                        action.headers = {
                            ...action.headers,
                            'Authorization': 'Bearer ' + localStorage.getItem(config.localStorage.accessTokenName)
                        }
                        const r = await api.dispatch(action)
                        console.log('r', r)
                    } else {
                        throw new Error('User not registered')
                    }
                } else {
                    throw new Error('Unknown error')
                }
            } catch (e: any) {
                store.dispatch(setErrorAction(e.error?.data?.message || e.error?.message || 'Unknown error'))
            }

        }

        return next(action)
    };