// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Statistics } from './pages/Statistics';
import { Settings } from './pages/Settings';
import { BinManagement } from './pages/admin/BinManagement';
import { Schedule } from './pages/admin/Schedule';
import { NotFound } from './pages/NotFound';

function App() {
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
