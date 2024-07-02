import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export type TCommonState = {
    success: string | string[] | null
    error: string | string[] | null
}

const initialState: TCommonState = {
    success: null,
    error: null
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setErrorAction: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
        setSuccessAction: (state, action: PayloadAction<string | null>) => {
            state.success = action.payload
        },
        cleanAction: (state, action: PayloadAction<string | void>) => {
            state.success = null
            state.error = null
        }
    }
})

export const {setErrorAction, setSuccessAction, cleanAction} = messageSlice.actions
export default messageSlice.reducer