import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
//import { useAuth } from './hooks/useAuth';
//import LoginPage from './pages/LoginPage';
import DogsList from '../src/components/dog-list';

function App() {
  //const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* <Route path='/login' element={<LoginPage />} /> */}
        <Route
          //path='/dogs'
          // element={user ? <DogsList /> : <Navigate to='/login' />}
          path='/'
          element={<DogsList />}
        />
      </Routes>
    </Router>
  );
}

export default App;
