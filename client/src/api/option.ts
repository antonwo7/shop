import {createApi} from "@reduxjs/toolkit/query/react";
import {buildBaseQuery} from "./services/baseQuery";
import {TOption} from "../types/option";
import {TNet} from "../types/net";
import config from "../config";
import {convertRequestData} from "../utils/request";

export const optionAPI = createApi({
    reducerPath: 'optionAPI',
    baseQuery: buildBaseQuery({
        baseUrl: `${process.env['REACT_APP_API_URL']}/`,
        credentials: 'include'
    }),
    tagTypes: ['options'],
    endpoints: (builder) => ({
        getOptions: builder.query<TOption[], void>({
            query: () => ({
                url: 'options/',
                method: 'GET'
            }),
            providesTags: ['options']
        }),
        patchOption: builder.mutation<void, Pick<TOption, '_id' | 'value'>>({
            query: (data) => ({
                url: `options/${data._id}`,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(config.localStorage.accessTokenName)
                },
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['options']
        }),
        patchFileOption: builder.mutation<void, {_id: number, files: FileList}>({
            query: (data) => ({
                url: `options/${data._id}/files`,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(config.localStorage.accessTokenName)
                },
                method: 'PATCH',
                formData: true,
                body: convertRequestData({}, data.files)
            }),
            invalidatesTags: ['options']
        }),
    })
})