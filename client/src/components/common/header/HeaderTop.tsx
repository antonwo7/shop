import React from 'react';
import TopSocial from "./headerTop/TopSocial";
import TopContacts from "./headerTop/TopContacts";
import Languages from "./headerTop/Languages";

const HeaderTop = () => {
    return (
        <div className="header_top">
            <div className="container">
                <TopContacts />
                <TopSocial />
                <Languages />
            </div>
        </div>
    );
};

export default HeaderTop;