// src/contexts/AuthContext.tsx
import {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import api, {getCsrf} from '../lib/axios';

type User = { id: number; name: string; email: string };

interface AuthCtx {
    user: User | null;
    login: (d: Creds) => Promise<void>;
    logout: () => Promise<void>;
}

const Ctx = createContext<AuthCtx>(null!);

export function AuthProvider({children}: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get<User>('/api/user')
            .then(r => setUser(r.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, [])

    const login = async (cred: { email: string; password: string }) => {
        await getCsrf();               // 1) set cookie
        await api.post('/login', cred); // 2) crea la sesión (ahora sí con header)
        const {data: me} = await api.get<User>('/api/user');
        setUser(me);
    };
    const logout = async () => {
        await api.post('/logout');
        setUser(null);
    };

    if (loading) return null

    return <Ctx.Provider value={{user, login, logout}}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
