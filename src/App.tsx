import type { ReactNode } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { uiFlags } from './config/uiFlags';
import { useAuth } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { DashboardPage } from './pages/DashboardPage/DashboardPage';
import { HistoryPage } from './pages/HistoryPage/HistoryPage';
import { NewCheckPage } from './pages/NewCheckPage/NewCheckPage';
import { TariffPage } from './pages/TariffPage/TariffPage';
import { BalancePage } from './pages/BalancePage/BalancePage';
import { SettingsPage } from './pages/SettingsPage/SettingsPage';
import { ManageAccountsPage } from './pages/ManageAccountsPage/ManageAccountsPage';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  // Когда `uiFlags.cabinetRoutesRequireAuth === false`, редирект отключён — см. комментарий в `uiFlags.ts`.
  if (uiFlags.cabinetRoutesRequireAuth && !isAuthenticated) {
    const next = encodeURIComponent(`${location.pathname}${location.search}`);
    return <Navigate to={`/?next=${next}`} replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/cabinet"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/new-check"
        element={
          <ProtectedRoute>
            <NewCheckPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tariff"
        element={
          <ProtectedRoute>
            <TariffPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/balance"
        element={
          <ProtectedRoute>
            <BalancePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage"
        element={
          <ProtectedRoute>
            <ManageAccountsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
