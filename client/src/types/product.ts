import {TFile} from "./file";

export type TProductProperty = {
    _id: string
    name: string
    value: string
}

export type TProductVariation = {
    _id: string
    price: number
    quantity: number
    properties: TProductProperty[]
}

export type TProduct = {
    _id: string
    name: string
    sku: string
    description: string
    images: TFile[]
    properties: TProductProperty[]
    variations: TProductVariation[]
}

export type TCategory = {
    _id: string
    name: string
    categories?: TCategory[]
}