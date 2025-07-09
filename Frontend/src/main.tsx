// src/main.tsx
import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {AuthProvider, useAuth} from './context/AuthContext';
import Iniciar from './pages/Iniciar.tsx';
import Orders from './pages/Orders';
import NewOrders from './pages/NewOrders';

function PrivateRoute({children}: { children: JSX.Element }) {
    const {user} = useAuth();
    return user ? children : <Navigate to="/iniciar" replace/>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/iniciar" element={<Iniciar/>}/>
                    <Route path="/orders" element={<PrivateRoute><Orders/></PrivateRoute>}/>
                    <Route path="/new-orders" element={<PrivateRoute><NewOrders/></PrivateRoute>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>,
);
