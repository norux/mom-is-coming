import './static/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';

ReactDOM.render(
  <div className="wrap">
    <div className="layout">
      <App />
    </div>
  </div>,
  document.getElementById('app')
);
