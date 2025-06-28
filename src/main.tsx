import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes'; // or './AppRoutes' if you renamed it
import { AuthProvider } from './context/AuthContext';
import '../src/index.css';
import { ThemeProvider } from '../src/context/ThemeContext'; 


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <ThemeProvider> {/* ✅ Wrap entire app */}
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

