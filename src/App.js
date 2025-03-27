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
import FavoritesPage from './components/favorites-page';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path='' element={<LoginPage />} />
        <Route
          path='/dogs'
          element={user ? <DogsList /> : <Navigate to='/' />}
        />
        <Route path='/favorites' element={<FavoritesPage />} />
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
