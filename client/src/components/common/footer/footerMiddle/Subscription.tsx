import React from 'react';

const Subscription = () => {
    return (
        <div className="f-subscribe">
            <h3>Subscribe to news</h3>
            <form className="f-subscribe-form" action="#">
                <input placeholder="Your e-mail" type="text" />
                <button type="submit"><i className="fa fa-paper-plane"/></button>
            </form>
            <p>Enter your email address if you want to receive our newsletter. Subscribe now!</p>
        </div>
    );
};

export default Subscription;