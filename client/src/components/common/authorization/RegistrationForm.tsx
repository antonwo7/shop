import React, {useState, ChangeEvent, MouseEvent, FC} from 'react';
import {authAPI} from "../../../api/auth";

type TRegistrationFormState = {
    name: string
    email: string
    password: string
}

const DefaultRegistrationFormState: TRegistrationFormState = {
    name: '',
    email: '',
    password: ''
}

const RegistrationForm: FC = () => {
    const [state, setState] = useState<TRegistrationFormState>(DefaultRegistrationFormState)
    const [loginAction, {}] = authAPI.useRegistrationMutation()

    const changeField = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget?.name
        const value = e.currentTarget.value
        if (!name || !(name in state) || value === undefined) return;

        setState({...state, [e.currentTarget.name]: value})
    }

    const submit = (e: MouseEvent<HTMLInputElement>) => {
        e.preventDefault()
        loginAction(state)
    }

    return (
        <>
            <h2>Register</h2>
            <form method="post" className="register">
                <p>
                    <label>Name <span className="required">*</span></label>
                    <input type="text" name="name" onChange={changeField} value={state.name} />
                </p>
                <p>
                    <label>Email <span className="required">*</span></label>
                    <input type="email" name="email" onChange={changeField} value={state.email} />
                </p>
                <p>
                    <label>Password <span className="required">*</span></label>
                    <input type="password" name="password" onChange={changeField} value={state.password} />
                </p>
                <p className="auth-submit">
                    <input type="submit" value="Register" onClick={submit} />
                </p>
            </form>
        </>
    );
};

export default RegistrationForm;