import React from 'react';
import ReactDOM from 'react-dom/client';

import { store } from '@/redux';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';

import App from '@/app';

import '@/sass/index.sass';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster richColors position='top-center' expand={false} />
      <App />
    </Provider>
  </React.StrictMode>
);
