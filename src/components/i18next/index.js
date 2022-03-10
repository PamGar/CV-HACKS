import i18next from 'i18next';
import I18NextHttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18next
  .use(I18NextHttpBackend)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'es'],
    backend: { loadPath: '/translations/{{ns}}/{{lng}}.json' },
    debug: false,
    fallbackLng: localStorage.getItem('lng') || 'es',
    ns: ['commons'],
    react: { useSuspense: true },
  });

export default i18next;
