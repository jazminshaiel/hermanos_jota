import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
    // Obtenemos el 'currentUser' de nuestro contexto
    const { currentUser } = useContext(AuthContext);

    // Si el usuario existe (está logueado), le permitimos ver
    // el componente hijo (ProfilePage) usando <Outlet />.
    if (currentUser) {
        return <Outlet />;
    }

    // Si 'currentUser' es null (no logueado), lo redirigimos a la página de login.
    return <Navigate to="/login" replace />;
};

export default ProtectedRoute;