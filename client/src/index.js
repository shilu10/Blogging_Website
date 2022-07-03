import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './Components/store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
const root1 = document.getElementById('root');
root1.style.height = "inherit";

root.render(
  <Provider store={store}>
        <App />
  </Provider>
);

