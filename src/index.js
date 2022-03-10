import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import i18next from './components/i18next';
import { I18nextProvider } from 'react-i18next';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>cargando....</div>}>
      <I18nextProvider i18next={i18next}>
        <App />
      </I18nextProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
