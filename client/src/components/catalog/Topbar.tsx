import React from 'react';

const Topbar = () => {
    return (
        <div className="section-top">

            <ul className="section-mode">
                <li className="section-mode-gallery"><a title="View mode: Gallery" href="catalog-gallery.html" /></li>
                <li className="section-mode-list active"><a title="View mode: List" href="catalog-list.html" /></li>
                <li className="section-mode-table"><a title="View mode: Table" href="catalog-table.html" /></li>
            </ul>

            <div className="section-sortby">
                <p>default sorting</p>
                <ul>
                    <li>
                        <a href="#">sort by popularity</a>
                    </li>
                    <li>
                        <a href="#">low price to high</a>
                    </li>
                    <li>
                        <a href="#">high price to low</a>
                    </li>
                    <li>
                        <a href="#">by title A <i className="fa fa-angle-right" /> Z</a>
                    </li>
                    <li>
                        <a href="#">by title Z <i className="fa fa-angle-right" /> A</a>
                    </li>
                    <li>
                        <a href="#">default sorting</a>
                    </li>
                </ul>
            </div>

            <div className="section-count">
                <p>12</p>
                <ul>
                    <li><a href="#">12</a></li>
                    <li><a href="#">24</a></li>
                    <li><a href="#">48</a></li>
                </ul>
            </div>

        </div>
    );
};

export default Topbar;