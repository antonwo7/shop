import React from 'react';
import {useAppSelector} from "../../../../store/hooks";
import {selectAllOptions} from "../../../../store/reducers/optionSlice";

const TopSocial = () => {
    const nets = useAppSelector(state => selectAllOptions(state)).filter(option => option.type === 'net')
    return (
        <>
            {nets && <ul className="social-icons nav navbar-nav">
                {nets.map((net, index) => <li key={index}>
                    <a href={net.value} rel="nofollow" target="_blank">
                        <i className={`fa fa-${net.name}`} />
                    </a>
                </li>)}
            </ul>}
        </>
    );
};

export default TopSocial;