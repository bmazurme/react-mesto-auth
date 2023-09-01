import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './app';
import { store } from './store';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);

function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }).catch((error: string) => {
        console.log('ServiceWorker registration failed: ', error);
      });
    });
  }
}

startServiceWorker();
