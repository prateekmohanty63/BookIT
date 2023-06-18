import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SearchContextProvider } from './context/SearchContext';
import { AuthContextProvider } from './context/AuthContext';

// authcontext provider is for authentication

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <SearchContextProvider>  
    <App />
    </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
