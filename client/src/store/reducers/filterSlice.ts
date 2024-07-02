import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {TAuthUser} from "../../types/user";

export type TFilterState = {
    categories?: string[]
    priceMin?: number
    priceMax?: number
    properties?: string[]
}

const initialState: TFilterState = {}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<Partial<TFilterState>>) => {
            for (let key in action.payload) {
                if (key in state)
                    (state as any)[key] = action.payload[(key as keyof TFilterState)]
            }
        },
        resetFilter: (state, action: PayloadAction<void>) => {
            for (let key in initialState) {
                (state as any)[key] = initialState[(key as keyof TFilterState)]
            }
        },
    }
})

export const {setFilter, resetFilter} = filterSlice.actions
export default filterSlice.reducer