import React, {ChangeEvent, ReactDOM, useEffect, useMemo, useRef, useState} from 'react';
import {useAppSelector, useOutsideClick} from "../../../../store/hooks";
import {selectAllOptions, selectOptionsEntities} from "../../../../store/reducers/optionSlice";
import config from "../../../../config"
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {optionAPI} from "../../../../api/option";
import {TOption} from "../../../../types/option";

const defaultEditingField: TOption = {
    _id: 0,
    name: '',
    value: ''
}

const TopContacts = () => {
    const ref = useRef<HTMLUListElement>(null)
    const options = useAppSelector(state => selectOptionsEntities(state))
    const user = useAppSelector(state => state.common.authUser)
    const [patchOption, {isLoading: isPatchOptionLoading}] = optionAPI.usePatchOptionMutation()

    const [editingField, setEditingField] = useState<TOption>(defaultEditingField)

    const onClickOut = ({target}: any) => {
        if (!ref?.current?.contains(target)) {
            setEditingField(defaultEditingField)
        }
    }

    const addEventHandler = () => document.addEventListener('click', onClickOut)
    const removeEventHandler = () => document.removeEventListener('click', onClickOut)

    useEffect(() => {
        if (editingField._id)
            addEventHandler()
        else
            removeEventHandler()
        return removeEventHandler
    }, [editingField])

    const saveField = () => {
        if (editingField.value) {
            patchOption(editingField)
        }
        setEditingField(defaultEditingField)
    }

    const isUserAdmin = useMemo(() => {
        return user && user.role == config.roleNames.admin
    }, [user])

    const editField = (option: TOption) => {
        if (isPatchOptionLoading) return;
        setEditingField(option)
    }

    const changeField = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        if (!name) return;
        const value = event.target.value
        if (value === null) return;
        setEditingField({
            ...editingField,
            value: value
        })
    }

    return (
        <ul className="contactinfo nav nav-pills" ref={ref}>
            {options['phone'] && <li>
                <i className="fa fa-phone"/>
                {editingField.name === 'phone'
                    ? <>
                        <input type="text" name="phone" data-option-id={options['phone']._id} value={editingField.value} onChange={changeField}/>{' '}
                        <i className="fa fa-save" onClick={saveField} />
                    </>
                    : <>
                        {options['phone'].value}{' '}
                        {isUserAdmin && <i className="fa fa-edit" onClick={() => editField(options['phone'])} />}
                    </>}
            </li>}
            {options['email'] && <li>
                <i className="fa fa-envelope"/>
                {editingField.name === 'email'
                    ? <>
                        <input type="text" name="email" data-option-id={options['email']._id} value={editingField.value} onChange={changeField}/>{' '}
                        <i className="fa fa-save" onClick={saveField} />
                    </>
                    : <>
                        {options['email'].value}{' '}
                        {isUserAdmin && <i className="fa fa-edit" onClick={() => editField(options['email'])} />}
                    </>}
            </li>}
        </ul>
    );
};

export default TopContacts;