import React from 'react';
import { Provider } from "react-redux";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import configureStore from "./store";
import { BrowserRouter } from 'react-router-dom';
const store = configureStore();

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  // </React.StrictMode>
);

reportWebVitals();
