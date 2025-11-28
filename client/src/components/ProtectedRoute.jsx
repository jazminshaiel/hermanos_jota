import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
    // Obtenemos el estado de autenticación del nuevo contexto
    const { estaAutenticado, cargando } = useAuth();

    // Mientras carga, mostramos un mensaje
    if (cargando) {
        return <div>Cargando...</div>;
    }

    // Si el usuario está autenticado, le permitimos ver el componente hijo usando <Outlet />.
    if (estaAutenticado) {
        return <Outlet />;
    }

    // Si no está autenticado, lo redirigimos a la página de login.
    return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
