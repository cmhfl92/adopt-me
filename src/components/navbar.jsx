import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { logoutUser } from '../api/dog-service';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate('/login');
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color='inherit' onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
