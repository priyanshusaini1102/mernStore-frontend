import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import {positions,transitions,Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { CookiesProvider } from "react-cookie";

const options = {
  timeout:5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
    <CookiesProvider>
    <App />
    </CookiesProvider>
    </AlertProvider>

  </Provider>,
  document.getElementById('root')
);

