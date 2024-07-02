import React, {useEffect, useState} from 'react';
import Filter from '../catalog/Filter';
import Page from "./Page";
import Topbar from "../catalog/Topbar";
import Pagination from "../catalog/Pagination";
import ProductList from "../catalog/lists/ProductList";
import {productAPI} from "../../api/product";
import {useSearchParams, useParams} from "react-router-dom";
import {buildParams, parseParams} from "../../utils/request"
import {TFilterState} from "../../store/reducers/filterSlice";

const Catalog = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [filter, setFilter] = useState<TFilterState>(parseParams(searchParams))
    const {data: products, refetch: fetchProducts} = productAPI.useGetProductsQuery(filter)

    const onSetFilter = (formFilter: TFilterState) => {
        const newFilter = {...filter, ...formFilter}
        setFilter(newFilter)
        setSearchParams(buildParams(newFilter || null))
    }

    return (
        <Page>
            <main>
                <section className="container">
                    <Filter setFilter={onSetFilter} defaultFilter={parseParams(searchParams)}/>
                    <div className="section-cont">
                        <Topbar />
                        <ProductList products={products} />
                        <Pagination />
                    </div>
                </section>
            </main>
        </Page>
    );
};

export default Catalog;