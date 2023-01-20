import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store';

import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/404';
import ErrorBoundaryWrapper from './components/ErrorBoundaryWrapper';

import { Urls } from './utils/constants';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div className="page">
          <ErrorBoundaryWrapper>
            <Routes>
              <Route path={Urls.BASE} element={(<MainPage />)} />
              <Route path={Urls.SIGNIN} element={(<SignInPage />)} />
              <Route path={Urls.SIGNUP} element={(<SignUpPage />)} />
              <Route path={Urls[404]} element={(<NotFoundPage />)} />
            </Routes>
          </ErrorBoundaryWrapper>
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
