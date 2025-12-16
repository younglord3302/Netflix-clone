import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Category } from './pages/Category';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { MovieDetail } from './pages/MovieDetail';
import { Watch } from './pages/Watch';
import { Watchlist } from './pages/Watchlist';
import './index.css';

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) {
    return <div className="min-h-screen bg-netflix-dark flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Navbar onSearch={setSearchQuery} />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home searchQuery={searchQuery} /> : <Navigate to="/login" />} />
        <Route path="/movie/:id" element={isAuthenticated ? <MovieDetail /> : <Navigate to="/login" />} />
        <Route path="/watch/:id" element={isAuthenticated ? <Watch /> : <Navigate to="/login" />} />
        <Route path="/watchlist" element={isAuthenticated ? <Watchlist /> : <Navigate to="/login" />} />
        <Route path="/category/:name" element={isAuthenticated ? <Category /> : <Navigate to="/login" />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
      </Routes>
      {isAuthenticated && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
