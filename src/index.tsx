import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react';

import './scss/global.scss';
import App from './App';

import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';

const _persistor = persistStore(store);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Router>
        <Provider store={store}>
          <PersistGate loading={null} persistor={_persistor}>
            <App />
          </PersistGate>
        </Provider>
      </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
