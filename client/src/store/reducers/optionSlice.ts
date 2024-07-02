import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {TAuthUser} from "../../types/user";
import {TOption} from "../../types/option";
import {optionAPI} from "../../api/option";
import {store} from "../store";

export const optionsAdapter = createEntityAdapter({
    selectId: (option: TOption) => option.name
})

const initialOptionState = {
    options: optionsAdapter.getInitialState()
}

export const optionSlice = createSlice({
    name: 'option',
    initialState: initialOptionState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addMatcher(optionAPI.endpoints.getOptions.matchFulfilled, (state, action) => {
                optionsAdapter.setAll(state.options, action.payload);
            })
    }
})

export const {} = optionSlice.actions
export default optionSlice.reducer

type RootState = ReturnType<typeof store.getState>

export const {
    selectById: selectOptionById,
    selectAll: selectAllOptions,
    selectEntities: selectOptionsEntities,
} = optionsAdapter.getSelectors<RootState>(state => state.option.options);