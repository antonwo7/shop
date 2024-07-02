import React from 'react';

const ProductTableList = () => {
    return (
        <div className="prod-items section-items prod-tb">
            <div className="prodtb-i">
                <div className="prodtb-i-top">
                    <button className="prodtb-i-toggle" type="button"></button>
                    <h3 className="prodtb-i-ttl"><a href="product.html">Adip33isci aperiam commodi</a></h3>
                    <div className="prodtb-i-info">
                        <span className="prodtb-i-price">
                            <b>$59</b>
                        </span>
                        <p className="prodtb-i-qnt">
                            <input value="1" type="text" />
                            <a href="#" className="prodtb-i-plus"><i className="fa fa-angle-up"></i></a>
                            <a href="#" className="prodtb-i-minus"><i className="fa fa-angle-down"></i></a>
                        </p>
                    </div>
                    <p className="prodtb-i-action">
                        <a href="#" className="qview-btn prodtb-i-qview"><span>Quick View</span><i className="fa fa-search"></i></a>
                    </p>
                </div>
                <div className="prodlist-i">
                    <a className="list-img-carousel prodlist-i-img" href="product.html" >
                        <img src="http://placehold.it/300x311" alt="Adipisci aperiam commodi" />
                        <img src="http://placehold.it/300x322" alt="Adipisci aperiam commodi" />
                        <img src="http://placehold.it/300x433" alt="Adipisci aperiam commodi" />
                        <img src="http://placehold.it/300x433" alt="Adipisci aperiam commodi" />
                    </a>
                    <div className="prodlist-i-cont">
                        <div className="prodlist-i-txt">
                            Quisquam totam quas veritatis dolor voluptates, laudantium repellendus. Cupiditate repellat
                            tempora consequatur sequi, neque
                        </div>
                        <div className="prodlist-i-skuwrap">
                            <div className="prodlist-i-skuitem">
                                <p className="prodlist-i-skuttl">Color</p>
                                <ul className="prodlist-i-skucolor">
                                    <li className="active"><img src="../../assets/img/color/blue.jpg" alt="" /></li>
                                    <li><img src="../../assets/img/color/red.jpg" alt="" /></li>
                                    <li><img src="../../assets/img/color/green.jpg" alt="" /></li>
                                </ul>
                            </div>
                            <div className="prodlist-i-skuitem">
                                <p className="prodlist-i-skuttl">Clothes sizes</p>
                                <div className="offer-props-select">
                                    <p>XS</p>
                                    <ul>
                                        <li><a href="#">S</a></li>
                                        <li><a href="#">M</a></li>
                                        <li><a href="#">L</a></li>
                                        <li className="active"><a href="#">XS</a></li>
                                        <li><a href="#">XL</a></li>
                                        <li><a href="#">XXL</a></li>
                                        <li><a href="#">XXXL</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ul className="prodlist-i-props2">
                        <li><span className="prodlist-i-propttl"><span>Exterior</span></span> <span
                            className="prodlist-i-propval">Silt Pocket</span></li>
                        <li><span className="prodlist-i-propttl"><span>Material</span></span> <span
                            className="prodlist-i-propval">PU</span></li>
                        <li><span className="prodlist-i-propttl"><span>Occasion</span></span> <span
                            className="prodlist-i-propval">Versatile</span></li>
                        <li><span className="prodlist-i-propttl"><span>Shape</span></span> <span
                            className="prodlist-i-propval">Casual Tote</span></li>
                        <li><span className="prodlist-i-propttl"><span>Pattern Type</span></span> <span
                            className="prodlist-i-propval">Solid</span></li>
                        <li><span className="prodlist-i-propttl"><span>Style</span></span> <span
                            className="prodlist-i-propval">American Style</span></li>
                        <li><span className="prodlist-i-propttl"><span>Hardness</span></span> <span
                            className="prodlist-i-propval">Soft</span></li>
                        <li><span className="prodlist-i-propttl"><span>Decoration</span></span> <span
                            className="prodlist-i-propval">None</span></li>
                        <li><span className="prodlist-i-propttl"><span>Closure Type</span></span> <span
                            className="prodlist-i-propval">Zipper</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductTableList;