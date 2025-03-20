import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAuth, AuthProvider } from './hooks/useAuth';
import { FavoritesProvider } from './hooks/useFavorites';
import DogsList from './components/dog-list';
import LoginPage from './components/login-page';
import Navbar from './components/navbar';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/dogs'
          element={user ? <DogsList /> : <Navigate to='/login' />}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Router>
          <AppRoutes />
        </Router>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
