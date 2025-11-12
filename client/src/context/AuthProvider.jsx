import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    // "mantener al usuario autenticado a través de recargas"
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedPayload = jwtDecode(token);
                setCurrentUser(decodedPayload);
            } catch (error) {
                console.error("Token inválido:", error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    // Función de Login
    const login = (token) => {
        try {
            localStorage.setItem('token', token);
            const decodedPayload = jwtDecode(token);
            setCurrentUser(decodedPayload);
            navigate('/perfil'); // Redirigir al perfil
        } catch (error) {
            console.error("Error al guardar token:", error);
        }
    };

    // Función de Logout
    const logout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
        navigate('/login');
    };

    const value = { currentUser, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};