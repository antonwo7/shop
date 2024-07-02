import React from 'react';
import {useAppSelector} from "../../../store/hooks";
import {selectOptionById, selectAllOptions} from "../../../store/reducers/optionSlice";

const FooterBottom = () => {
    const copyright = useAppSelector(state => selectOptionById(state, 'copyright'))
    const nets = useAppSelector(state => selectAllOptions(state)).filter(option => option.type === 'net')
    return (
        <div className="footer-bottom">
            <div className="container">
                <div className="row">
                    {nets && <ul className="social-icons nav navbar-nav">
                        {nets.map((net, index) => <li key={index}>
                            <a href={net.value} rel="nofollow" target="_blank">
                                <i className={`fa fa-${net.name}`} />
                            </a>
                        </li>)}
                    </ul>}
                    {copyright && <div className="footer-copyright">
                        {copyright.value}
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default FooterBottom;