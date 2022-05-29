//MAIN IMPORT
import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthProvider from './providers/authProvider';
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
  // <AuthProvider>
    
  // </AuthProvider>

    <Router>
      <App>

      </App>
    </Router>

);  

