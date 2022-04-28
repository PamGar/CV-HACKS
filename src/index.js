import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import i18next from './components/i18next';
import { I18nextProvider } from 'react-i18next';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<div>cargando....</div>}>
    <I18nextProvider i18next={i18next}>
      <App />
    </I18nextProvider>
  </Suspense>
);
