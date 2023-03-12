import React from 'react';
import ReactDOM from 'react-dom/client';
import CurrentUserContextProvider from './Context/CurrentUserContext';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <CurrentUserContextProvider>
      <App />
    </CurrentUserContextProvider>
  </BrowserRouter>
);
