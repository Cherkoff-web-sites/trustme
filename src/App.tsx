import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage/DashboardPage';
import { HistoryPage } from './pages/HistoryPage/HistoryPage';
import { NewCheckPage } from './pages/NewCheckPage/NewCheckPage';
import { TariffPage } from './pages/TariffPage/TariffPage';
import { BalancePage } from './pages/BalancePage/BalancePage';
import { SettingsPage } from './pages/SettingsPage/SettingsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cabinet" replace />} />
      <Route path="/cabinet" element={<DashboardPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/new-check" element={<NewCheckPage />} />
      <Route path="/tariff" element={<TariffPage />} />
      <Route path="/balance" element={<BalancePage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}
