import React from 'react';
import Search from "./headerBottom/Search";
import CatalogMenu from "./headerBottom/CatalogMenu";
import MainMenu from "./headerBottom/MainMenu";

const HeaderBottom = () => {
    return (
        <div className="header-bottom">
            <div className="container">
                <nav className="topmenu">
                    <CatalogMenu />
                    <MainMenu />
                    <Search />
                </nav>
            </div>
        </div>
    );
};

export default HeaderBottom;