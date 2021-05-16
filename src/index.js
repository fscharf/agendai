import React from 'react';
import ReactDOM from 'react-dom';
import "./assets/css/style.min.css";
import "izitoast/dist/js/iziToast";
import "izitoast/dist/css/iziToast.css"
import Routes from './routes';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
