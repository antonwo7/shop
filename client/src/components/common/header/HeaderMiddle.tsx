import React from 'react';
import SubMenu from "./headerMiddle/SubMenu";
import Logo from "./headerMiddle/Logo";

const HeaderMiddle = () => {
    return (
        <div className="header-middle">
            <div className="container header-middle-cont">
                <div className="header-middle-block">
                    <Logo />
                    <SubMenu />
                </div>
            </div>
        </div>
    );
};

export default HeaderMiddle;