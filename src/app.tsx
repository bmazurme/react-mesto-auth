import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SignInPage from './pages/signIn-page';
import SignUpPage from './pages/signup-page';
import MainPage from './pages/main-page';
import NotFoundPage from './pages/404';

import ErrorBoundaryWrapper from './components/error-boundary-wrapper';

import { Urls } from './utils/constants';

import ThemeContext from './context/theme-context';
import useDarkTheme from './hooks/use-dark-theme';

export default function App() {
  const { providerValue } = useDarkTheme();

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
