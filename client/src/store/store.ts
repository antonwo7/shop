import {configureStore} from "@reduxjs/toolkit"
import commonReducer from "./reducers/commonSlice";
import optionReducer from "./reducers/optionSlice";
import messageReducer from "./reducers/messageSlice";
import {setupListeners} from "@reduxjs/toolkit/query";
import {authAPI} from "../api/auth";
import {productAPI} from "../api/product";
import {optionAPI} from "../api/option";

export const store = configureStore({
    reducer: {
        common: commonReducer,
        option: optionReducer,
        message: messageReducer,
        [authAPI.reducerPath]: authAPI.reducer,
        [productAPI.reducerPath]: productAPI.reducer,
        [optionAPI.reducerPath]: optionAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(
        authAPI.middleware,
        productAPI.middleware,
        optionAPI.middleware
    )
})

store.getState()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)