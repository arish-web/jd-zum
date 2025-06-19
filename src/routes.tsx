import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from './context/AuthContext';
import { Login } from './pages/Login'
import { Register } from './pages/Register';
import TattooDashboard from './pages/dashboards/TattooDashboard';
import PhotoDashboard from './pages/dashboards/PhotoDashboard';
import ClientDashboard from './pages/dashboards/ClientDashboard';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
         {/* <Route path="/register" element={<Navigate to="/register" replace />} /> */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/tattoo" element={<PrivateRoute><TattooDashboard /></PrivateRoute>} />
        <Route path="/dashboard/photo" element={<PrivateRoute><PhotoDashboard /></PrivateRoute>} />
        <Route path="/dashboard/client" element={<PrivateRoute><ClientDashboard /></PrivateRoute>} />
         <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}