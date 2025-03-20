import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAuth, AuthProvider } from './hooks/useAuth';
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
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
