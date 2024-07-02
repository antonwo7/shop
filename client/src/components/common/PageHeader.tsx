import React from 'react';

const PageHeader = () => {
    return (
        <>
            <ul className="b-crumbs">
                <li>
                    <a href="index.html">
                        Home
                    </a>
                </li>
                <li>
                    <a href="catalog-list.html">
                        Catalog
                    </a>
                </li>
                <li>
                    <span>Women</span>
                </li>
            </ul>
            <h1 className="main-ttl">
                <span>Women</span>
            </h1>
        </>
    );
};

export default PageHeader;