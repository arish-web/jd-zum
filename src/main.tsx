import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes'; // or './AppRoutes' if you renamed it
import { AuthProvider } from './context/AuthContext';
import '../src/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);

