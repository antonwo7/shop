import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {useTranslation, withTranslation, Trans} from 'react-i18next';
import {useAppSelector} from "../../../../store/hooks";
import {authAPI} from "../../../../api/auth";

const SubMenu = () => {
    const {t} = useTranslation()
    const authUser = useAppSelector(state => state.common.authUser)
    const cartItems = useAppSelector(state => state.common.cart)
    const [logoutAction] = authAPI.useLogoutMutation()

    const logoutHandler = () => {
        logoutAction()
    }
    return (
        <div className="shop-menu">
            <ul>
                {authUser && <>
                    <li>
                        <a href="/">
                            <i className="fa fa-user"/>
                            <span className="shop-menu-ttl">{authUser.name}</span>
                        </a>
                    </li>

                    {/*<li>*/}
                    {/*    <a href="wishlist.html">*/}
                    {/*        <i className="fa fa-heart"/>*/}
                    {/*        <span className="shop-menu-ttl">{t('wishlist')}</span>*/}
                    {/*        (<span id="topbar-favorites">1</span>)*/}
                    {/*    </a>*/}
                    {/*</li>*/}

                    {/*<li>*/}
                    {/*    <a href="compare.html">*/}
                    {/*        <i className="fa fa-bar-chart"/>*/}
                    {/*        <span className="shop-menu-ttl">{t('compare')}</span> (5)*/}
                    {/*    </a>*/}
                    {/*</li>*/}
                </>}

                {!authUser && <li className="topauth">
                    <NavLink to="/authorization">
                        <i className="fa fa-lock"/>
                        <span className="shop-menu-ttl">{t('registration')}</span>
                    </NavLink>
                    <NavLink to="/authorization">
                        <span className="shop-menu-ttl">{t('login')}</span>
                    </NavLink>
                </li>}

                <li>
                    <div className="h-cart">
                        <Link to={'/cart/'}>
                            <i className="fa fa-shopping-cart"/>
                            <span className="shop-menu-ttl">{t('cart')}</span>
                            (<b>{Object.keys(cartItems).length}</b>)
                        </Link>
                    </div>
                </li>

                {authUser && <li>
                    <NavLink to="#" onClick={logoutHandler}>
                        <i className="fa fa-sign-out"/>
                        <span className="shop-menu-ttl">{t('Logout')}</span>
                    </NavLink>
                </li>}

            </ul>
        </div>
    );
};

export default SubMenu;