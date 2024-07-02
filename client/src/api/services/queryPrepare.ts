import {BaseQueryArg} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import config from "../../config";

export const queryPrepare: BaseQueryArg<any> = (url: string, method: string, data?: any, withToken?: boolean | undefined) => {
    const query: any = {
        url,
        method,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    }

    if (data) {
        if (method === 'GET') query.params = data
        if (method === 'POST') query.body = data
    }

    if (withToken) {
        const token = localStorage.getItem(config.localStorage.accessTokenName)
        if (token)
            query.headers['Authorization'] = `Bearer ${token}`
    }

    return query
}