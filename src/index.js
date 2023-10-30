import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; 
import { DoctorAuthProvider } from './contexts/DoctorAuthContext.jsx'; 

ReactDOM.render(
  <React.StrictMode>
    <DoctorAuthProvider> 
      <App />
    </DoctorAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
