import React, { useState, useMemo, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import SignInPage from './pages/signIn-page';
import SignUpPage from './pages/signup-page';
import MainPage from './pages/main-page';
import NotFoundPage from './pages/404';

import ErrorBoundaryWrapper from './components/error-boundary-wrapper';

import { Urls } from './utils/constants';

import ThemeContext from './context/theme-context';

export default function App() {
  const [style, setStyle] = useState('light');
  const providerValue = useMemo(() => ({ style, setStyle }), [style, setStyle]);

  useEffect(() => {
    const currentTheme = localStorage.getItem('ms-theme');
    document.documentElement.setAttribute('ms-theme', (currentTheme === 'dark') ? 'dark' : 'light');
  }, [style]);

  return (
    <ThemeContext.Provider value={providerValue}>
      <ErrorBoundaryWrapper>
        <Routes>
          <Route path={Urls.BASE} element={(<MainPage />)} />
          <Route path={Urls.SIGNIN} element={(<SignInPage />)} />
          <Route path={Urls.SIGNUP} element={(<SignUpPage />)} />
          <Route path={Urls[404]} element={(<NotFoundPage />)} />
        </Routes>
      </ErrorBoundaryWrapper>
    </ThemeContext.Provider>
  );
}
