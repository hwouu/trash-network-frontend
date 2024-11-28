import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import Statistics from './pages/Statistics';
import { Settings } from './pages/Settings';
import BinManagement from './pages/admin/BinManagement';
import Schedule from './pages/admin/Schedule';
import NotFound from './pages/NotFound';
import { useThemeStore } from './store/useThemeStore';
import { applyTheme } from './utils/theme';

// React Query 클라이언트 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    applyTheme(isDarkMode);
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;