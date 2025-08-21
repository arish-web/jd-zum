import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "./context/AuthContext";
import { Login } from "./pages/LoginPage";
import { Register } from "./pages/RegisterPage";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import TattooDashboard from "./pages/dashboards/TattooDashboard";
import PhotoDashboard from "./pages/dashboards/PhotoDashboard";
import ClientDashboard from "./pages/dashboards/ClientDashboard";
import Tattoos from "./pages/TattoosPage";
import Photos from "./pages/PhotosPage";
import Services from "./pages/ServicesPage";
import TattoosDetails from "./pages/TattooDetails";
import PhotosDetails from "./pages/PhotosDetails";



const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Services />} />
        <Route path="/login" element={<Login />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard/tattoo"
          element={
            <PrivateRoute>
              <TattooDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/photo"
          element={
            <PrivateRoute>
              <PhotoDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/client"
          element={
            <PrivateRoute>
              <ClientDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/tattoos" element={<Tattoos />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/service" element={<Services />} />
        <Route path="/tattoos/:id" element={<TattoosDetails />} />
        <Route path="/photos/:id" element={<PhotosDetails />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}
