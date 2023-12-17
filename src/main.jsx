import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { store } from './Store/store';
import AppRouter from './Router/Router.jsx';
import App from './App';
// import * as serviceWorker from './Workers/service/service-worker';

const persistedStore = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistedStore}> */}
        <AppRouter />
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);

// serviceWorker.register();