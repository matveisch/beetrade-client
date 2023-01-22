import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import RouteSwitch from './RouteSwitch';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouteSwitch />
    </Provider>
  </React.StrictMode>,
);
