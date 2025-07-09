// src/pages/Orders.tsx
import { useEffect, useState } from 'react';
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import api from '../lib/axios';
import { useAuth } from '../context/AuthContext';

type Order = { id:number; total:number; status:string; created_at:string };

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const { logout } = useAuth();

    useEffect(() => {
        api.get<Order[]>('/api/orders').then(r => setOrders(r.data));
    }, []);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Órdenes</Typography>
            <Button variant="outlined" onClick={logout} sx={{ mb: 2 }}>Cerrar sesión</Button>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell><TableCell>Total</TableCell><TableCell>Status</TableCell><TableCell>Creada</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map(o=>(
                        <TableRow key={o.id}>
                            <TableCell>{o.id}</TableCell>
                            <TableCell>${o.total.toFixed(2)}</TableCell>
                            <TableCell>{o.status}</TableCell>
                            <TableCell>{new Date(o.created_at).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}
