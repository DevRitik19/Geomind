import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GameProvider } from './context/GameContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

const Home = lazy(() => import('./pages/Home'));
const Auth = lazy(() => import('./pages/Auth'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Game = lazy(() => import('./pages/Game'));

const Loader = () => (
  <div className="flex items-center justify-center min-h-[60vh] w-full">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
      <GameProvider>
        <Suspense fallback={<Loader />}>
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
        </Suspense>
      </GameProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
