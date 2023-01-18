import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store';

import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';

import { Urls } from './utils/constants';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div className="page">
          <Routes>
            <Route path={Urls.BASE} element={(<MainPage />)} />
            <Route path={Urls.SIGNIN} element={(<SignInPage />)} />
            <Route path={Urls.SIGNUP} element={(<SignUpPage />)} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
