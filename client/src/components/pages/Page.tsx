import React, {ReactElement} from 'react';
import Header from "../common/Header";
import Footer from "../common/Footer";

const Page = ({children}: {children: ReactElement}) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default Page;