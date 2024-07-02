import React from 'react';

const FooterMenu = () => {
    return (
        <>
            <div className="f-menu">
                <h3>
                    About us
                </h3>
                <ul className="nav nav-pills nav-stacked">
                    <li className="active"><a href="index.html">Home</a></li>
                    <li><a href="catalog-list.html">Catalog</a></li>
                    <li><a href="elements.html">Elements</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="contacts.html">Contacts</a></li>
                </ul>
            </div>
            <div className="f-menu">
                <h3>
                    Shop
                </h3>
                <ul className="nav nav-pills nav-stacked">
                    <li><a href="catalog-list.html">Women</a></li>
                    <li><a href="catalog-list.html">Men</a></li>
                    <li><a href="catalog-list.html">Kids</a></li>
                    <li><a href="catalog-list.html">Shoes</a></li>
                    <li><a href="catalog-list.html">Accessories</a></li>
                </ul>
            </div>
            <div className="f-menu">
                <h3>
                    Information
                </h3>
                <ul className="nav nav-pills nav-stacked">
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="blog.html">News</a></li>
                    <li><a href="reviews.html">Reviews</a></li>
                    <li><a href="blog.html">Articles</a></li>
                    <li><a href="contacts.html">Contacts</a></li>
                </ul>
            </div>
            <div className="f-menu">
                <h3>
                    Pages
                </h3>
                <ul className="nav nav-pills nav-stacked">
                    <li><a href="contacts.html">About us</a></li>
                    <li><a href="contacts.html">Delivery</a></li>
                    <li><a href="contacts.html">Guarantees</a></li>
                    <li><a href="contacts.html">Contacts</a></li>
                    <li><a href="404.html">Page 404</a></li>
                </ul>
            </div>
        </>
    );
};

export default FooterMenu;