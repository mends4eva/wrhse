import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LoginScreen } from "./components/auth/LoginScreen";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { KPIAnalytics } from "./pages/KPIAnalytics";
import { TurnaroundEntry } from "./pages/TurnaroundEntry";
import { PicklistManagement } from "./pages/PicklistManagement";
import { Handshake } from "./pages/Handshake";
import { StockTaking } from "./pages/StockTaking";
import { Scheduling } from "./pages/Scheduling";
import { Attendance } from "./pages/Attendance";
import { VehicleTracking } from "./pages/VehicleTracking";
import { Messages } from "./pages/Messages";
import { Permissions } from "./pages/Permissions";
import { Configuration } from "./pages/Configuration";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginScreen />} 
      />
      <Route 
        path="/" 
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/kpi"
        element={
          <ProtectedRoute>
            <KPIAnalytics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/turnaround"
        element={
          <ProtectedRoute>
            <TurnaroundEntry />
          </ProtectedRoute>
        }
      />
      <Route
        path="/picklist"
        element={
          <ProtectedRoute>
            <PicklistManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/handshake"
        element={
          <ProtectedRoute>
            <Handshake />
          </ProtectedRoute>
        }
      />
      <Route
        path="/stock-taking"
        element={
          <ProtectedRoute>
            <StockTaking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/scheduling"
        element={
          <ProtectedRoute>
            <Scheduling />
          </ProtectedRoute>
        }
      />
      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <Attendance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vehicles"
        element={
          <ProtectedRoute>
            <VehicleTracking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/permissions"
        element={
          <ProtectedRoute>
            <Permissions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/configuration"
        element={
          <ProtectedRoute>
            <Configuration />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-wms-bg">
          <div className="text-wms-cyan font-mono">Loading...</div>
        </div>
      }>
        <AppRoutes />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
