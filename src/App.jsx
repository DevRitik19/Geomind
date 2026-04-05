import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GameProvider } from './context/GameContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Game from './pages/Game';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
      <GameProvider>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Auth />} />
          
          {/* Protected Routes */}
          <Route path="dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="game" element={
            <PrivateRoute>
              <Game />
            </PrivateRoute>
          } /> 
        </Route>
      </Routes>
      </GameProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
