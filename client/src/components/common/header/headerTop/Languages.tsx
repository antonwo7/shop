import React from 'react';
import {useTranslation} from 'react-i18next';
import classNames from "classnames";

function importAll(r: any) {
    const images: {[key: string]: string} = {}
    r.keys().map((item: string, index: number) => {
        images[item.replace('./', '').replace('.svg', '')] = r(item);
    });
    return images;
}

const flags = importAll(require.context('./../../../../assets/img/flags/', false, /\.(png|jpe?g|svg)$/));

const Languages = () => {
    const {t, i18n} = useTranslation();

    const changeLanguage = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!e.currentTarget.dataset.code) return;
        i18n.changeLanguage(e.currentTarget.dataset.code)
    }

    // @ts-ignore
    const languageList = i18n.options.languages || []

    return (
        <ul className="social-icons nav navbar-nav languages">
            {languageList && languageList.map((key: string) => {
                return (
                    <li key={key}>
                        <a
                            href="#"
                            data-code={key}
                            className={classNames('', {'active': key === i18n.language})}
                            onClick={changeLanguage}
                        >
                            <img width={20} height={15} src={flags[key]} alt="" />
                        </a>
                    </li>
                )
            })}
        </ul>
    );
};

export default Languages;