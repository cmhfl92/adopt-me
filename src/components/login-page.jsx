import { Container, TextField, Button } from "@mui/material";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import {loginUser} from '../api/dog-service'
import { useAuth } from "../hooks/useAuth";


const LoginPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
           const success = await loginUser(name, email);
           if (success) {
            setUser({name, email});
            navigate('/dogs');
           } 
        } catch (error) {
            alert('Login Failed! Please try again.')
        }
    };

    return (
        <Container>
            <h1>Login</h1>
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
            <Button variant="contained" onClick={handleLogin}>Login</Button>
        </Container>
    );
}

export default LoginPage;