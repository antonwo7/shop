import React from 'react';
import Filter from "../catalog/Filter";
import Topbar from "../catalog/Topbar";
import ProductList from "../catalog/lists/ProductList";
import Pagination from "../catalog/Pagination";
import Page from "./Page";
import ProductTableList from "../catalog/lists/ProductTableList";

const Admin = () => {
    return (
        <Page>
            <main>
                <section className="container">
                    <Filter setFilter={() => {}}/>
                    <div className="section-cont">
                        <ProductTableList />
                        <Pagination />
                    </div>
                </section>
            </main>
        </Page>
    );
};

export default Admin;