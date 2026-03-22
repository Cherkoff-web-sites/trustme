import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthModalUiProvider } from './context/AuthModalUiContext';
import App from './App';
import './style.css';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AuthModalUiProvider>
          <App />
        </AuthModalUiProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
