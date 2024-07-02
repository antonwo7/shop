import React from 'react';

const Pagination = () => {
    return (
        <ul className="pagi">
            <li className="active"><span>1</span></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li className="pagi-next"><a href="#"><i className="fa fa-angle-double-right" /></a></li>
        </ul>
    );
};

export default Pagination;