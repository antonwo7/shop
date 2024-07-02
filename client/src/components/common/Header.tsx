import React from 'react';
import HeaderMiddle from "./header/HeaderMiddle";
import HeaderBottom from "./header/HeaderBottom";
import HeaderTop from "./header/HeaderTop";
import LoadingScreen from "./LoadingScreen";
import {useAppSelector} from "../../store/hooks";
import FeedbackModal from "./FeedbackModal";

const Header = () => {
    const message = useAppSelector(state => state.message)
    const isLoading = useAppSelector(state => state.common.isLoading)
    return (
        <>
            {isLoading && <LoadingScreen />}
            {message.success && <FeedbackModal data={message.success} />}
            {message.error && <FeedbackModal data={message.error} isError={true} />}
            <header className="header">
                <HeaderTop />
                <HeaderMiddle />
                <HeaderBottom />
            </header>
        </>
    );
};

export default Header;