import React from 'react';
import RegistrationForm from '../common/authorization/RegistrationForm';
import Page from "./Page";
import LoginForm from "../common/authorization/LoginForm";

const Authorization = () => {
    return (
        <Page>
            <main>
                <section className="container stylization maincont">
                    <div className="auth-wrap">
                        <div className="auth-col">
                            <LoginForm />
                        </div>
                        <div className="auth-col">
                            <RegistrationForm />
                        </div>
                    </div>
                </section>
            </main>
        </Page>
    );
};

export default Authorization;