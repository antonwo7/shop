import React from 'react';

const Search = () => {
    return (
        <div className="topsearch">
            <a id="topsearch-btn" className="topsearch-btn" href="#"><i className="fa fa-search"/></a>
            <form className="topsearch-form" action="#">
                <input type="text" placeholder="Search products" />
                <button type="submit"><i className="fa fa-search"/></button>
            </form>
        </div>
    );
};

export default Search;