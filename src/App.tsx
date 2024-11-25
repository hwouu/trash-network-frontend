
// src/App.tsx 업데이트
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Statistics } from './pages/Statistics';
import { Settings } from './pages/Settings';
import { BinManagement } from './pages/admin/BinManagement';
import { Schedule } from './pages/admin/Schedule';
import { NotFound } from './pages/NotFound';
import { useThemeStore } from './store/useThemeStore';
import { applyTheme } from './utils/theme';

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    applyTheme(isDarkMode);
  }, [isDarkMode]);

  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin/bins" element={<BinManagement />} />
          <Route path="/admin/schedule" element={<Schedule />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;