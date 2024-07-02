import React, {ChangeEvent, useMemo, useRef} from 'react';
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../../../store/hooks";
import config from "../../../../config";
import {selectAllOptions, selectOptionById} from "../../../../store/reducers/optionSlice";
import {optionAPI} from "../../../../api/option";
import {apiUri} from "../../../../utils/request";

const defaultLogoUrl = 'https://via.placeholder.com/170x53'

const Logo = () => {
    const ref = useRef<HTMLInputElement>(null)
    const user = useAppSelector(state => state.common.authUser)
    const logo = useAppSelector(state => selectOptionById(state, 'logo'))
    const [patchFileOption, {}] = optionAPI.usePatchFileOptionMutation()

    const isUserAdmin = useMemo(() => {
        return user && user.role == config.roleNames.admin
    }, [user])

    const editField = () => {
        ref.current && ref.current.click()
    }

    const changeField = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || !files.length) return;
        patchFileOption({
            _id: logo._id,
            files
        })
    }

    return (
        <div className="toplogo">
            <NavLink to="/">
                <img src={logo ? apiUri(logo.value) : defaultLogoUrl} alt="" />
            </NavLink>
            {isUserAdmin && <>
                <i className="fa fa-edit icon-inside" onClick={editField} />
                <input ref={ref} type="file" style={{display: 'none'}} hidden={true} name="files" multiple={false} onChange={changeField}/>
            </>}
        </div>
    );
};

export default Logo;