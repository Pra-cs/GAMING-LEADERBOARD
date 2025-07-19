import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeaderboardView from './components/LeaderboardView';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LeaderboardView />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
