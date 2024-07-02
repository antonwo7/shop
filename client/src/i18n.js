import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import ChainedBackend from 'i18next-chained-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';
import config from './config'

function importResources(r) {
    return r.keys().reduce((accum, current) => {
        const cleanCurrent = current.replace('./', '').replace('.js', '')
        accum[cleanCurrent] = {
            translation: r(current).default
        }
        return accum;
    }, {})
}

const resources = importResources(require.context('./languages/', false, /\.(js)$/));

i18n
    .use(ChainedBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        lng: "en",
        languages: config.languages,
        resources: resources,
        backend: {
            backends: [LocalStorageBackend, HttpBackend],
            backendOptions: [],
            cacheHitMode: 'refreshAndUpdateStore',
        },

        react: {
            bindI18nStore: 'added',
        },
    });

export default i18n;