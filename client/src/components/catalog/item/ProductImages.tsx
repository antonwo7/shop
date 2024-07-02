import React from 'react';
import {TProduct} from "../../../types/product";
import {apiUri} from "../../../utils/request";

const ProductImages = ({product}: {product: TProduct}) => {
    return (
        <div className="prod-slider-wrap">
            <div className="prod-slider">
                <ul className="prod-slider-car">
                    {product.images && product.images.map(image => <li>
                        <a data-fancybox-group="product" className="fancy-img" href={image.name}>
                            <img src={apiUri(image.name)} alt="" />
                        </a>
                    </li>)}
                </ul>
            </div>
            <div className="prod-thumbs">
                <ul className="prod-thumbs-car">
                    {product.images && product.images.map((image, i) => <li>
                        <a data-slide-index={i} data-fancybox-group="product" className="fancy-img" href={image.name}>
                            <img src={apiUri(image.name)} alt="" />
                        </a>
                    </li>)}
                </ul>
            </div>
        </div>
    );
};

export default ProductImages;