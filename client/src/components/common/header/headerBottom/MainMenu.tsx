import React from 'react';
import {NavLink} from "react-router-dom";

const MainMenu = () => {
    return (
        <>
            <button type="button" className="mainmenu-btn">Menu</button>
            <ul className="mainmenu">
                <li>
                    <NavLink to="/" className="active">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/catalog">
                        Catalog
                    </NavLink>
                </li>
            </ul>
        </>
    );
};

export default MainMenu;