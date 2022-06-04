//MAIN IMPORT
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';



//IMPORT MAIN STYLES
import 'antd/dist/antd.css';
import 'normalize.css';
import './styles/vars.scss';
import './styles/global.scss';


//IMPORT COMPONENT
import App from './components/app/App';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <App/>
  </Router>
);  

