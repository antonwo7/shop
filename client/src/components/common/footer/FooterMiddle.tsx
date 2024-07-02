import React from 'react';
import Subscription from "./footerMiddle/Subscription";
import FooterMenu from "./footerMiddle/FooterMenu";

const FooterMiddle = () => {
    return (
        <div className="container f-menu-list">
            <div className="row">
                <FooterMenu />
                <Subscription />
            </div>
        </div>
    );
};

export default FooterMiddle;