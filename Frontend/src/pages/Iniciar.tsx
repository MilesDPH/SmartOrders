// src/pages/Login.tsx
import { Button, Container, TextField, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {useNavigate} from "react-router-dom";

export default function Iniciar() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        console.log("Entre a handle submit");
        e.preventDefault();
        setLoading(true);
        try {
            await login({ email, password });
            navigate('/orders');
        } finally { setLoading(false); }
    };

    return (
        <Container maxWidth="xs">
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8, display:'flex', flexDirection:'column', gap:2 }}>
                <Typography variant="h5" align="center">SmartOrders Login</Typography>
                <TextField label="E-mail" value={email} onChange={e=>setEmail(e.target.value)} fullWidth required />
                <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} fullWidth required />
                <Button variant="contained" type="submit" disabled={loading} fullWidth>
                    {loading ? 'Entrando…' : 'Entrar'}
                </Button>
            </Box>
        </Container>
    );
}
