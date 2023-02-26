import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import './configurations/i18next';
import rolesStore from './redux/reducers/rolesStore';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
    <Provider store={rolesStore}>
        <App />
    </Provider>
);