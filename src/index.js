import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { Store, persistor } from "./store";

import 'react-toastify/dist/ReactToastify.css';
import "./assets/css/style.css"
import "./assets/css/responsive.css"
import "./assets/css/jquery.fancybox.min.css"
import "./assets/css/bootstrap.min.css"
import "./assets/css/font-awesome.css"
import "./assets/css/vendor.bundle.base.css"
import "./assets/css/materialdesignicons.min.css"
import "./assets/css/vendor.bundle.base.css"

import { Toaster } from 'react-hot-toast';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster
          position='top-center'
          reverseOrder={false}
          toastOptions={{
            duration: 1500
          }}
        />
      </PersistGate>
    </Provider>
  </React.StrictMode>
); 