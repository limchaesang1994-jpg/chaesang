import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './firebase/auth';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import NoticeBoard from './pages/NoticeBoard';
import GalleryPage from './pages/GalleryPage';
import ChatRoom from './pages/ChatRoom';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return <Layout>{children}</Layout>;
};

const AppContent = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

        <Route path="/" element={
          <ProtectedRoute><Home /></ProtectedRoute>
        } />

        <Route path="/notices" element={
          <ProtectedRoute><NoticeBoard /></ProtectedRoute>
        } />

        <Route path="/gallery" element={
          <ProtectedRoute><GalleryPage /></ProtectedRoute>
        } />

        <Route path="/chat" element={
          <ProtectedRoute><ChatRoom /></ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
