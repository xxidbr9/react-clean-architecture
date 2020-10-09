/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app'),
);

// For hot relode
if (module.hot) {
  module.hot.accept();
}
