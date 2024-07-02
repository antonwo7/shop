import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'
import './assets/css/main.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {store} from "./store/store";

import './i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);