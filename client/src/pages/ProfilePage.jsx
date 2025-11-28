import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';

// componentes y estilos
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/estilos-auth.css';

function ProfilePage() {
    const { usuario, logout, token, cargando } = useAuth();
    const { vaciarCarrito } = useCart();
    const navigate = useNavigate();
    
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (usuario) {
            setNombre(usuario.nombre || usuario.username || '');
        }
    }, [usuario]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        
        try {
            const updateBody = { nombre };
            if (password) {
                updateBody.password = password;
            }

            await axios.put(
                'http://localhost:3001/api/users/profile', 
                updateBody,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );
            
            setSuccess('¡Perfil actualizado! (Necesitarás re-loguear para ver los cambios)');
            setPassword('');
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.mensaje || 'Error al actualizar');
        }
    };

    const handleLogout = () => {
        vaciarCarrito();
        logout();
        navigate('/login');
    };

    if (cargando) {
        return <p>Cargando...</p>;
    }

    if (!usuario) {
        return (
            <div>
                <p>No estás autenticado. Redirigiendo...</p>
            </div>
        );
    }

    return (
        <>
            <Header />
            
            <main className="auth-container">
                <div style={{ width: '100%', maxWidth: '500px' }}>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>Mi Perfil</h2>
                    <p style={{textAlign: 'center', margin: '-1rem 0 1.5rem 0', fontFamily: '"Inter", sans-serif'}}>
                        Hola, {usuario.nombre || usuario.username || 'Usuario'}. Aquí puedes actualizar tus datos.
                    </p>
                    
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Nueva Contraseña (Opcional)</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Dejar en blanco para no cambiar"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}
                    {success && <p style={{color: 'green', textAlign: 'center'}}>{success}</p>}

                    <button type="submit" className="auth-button">Actualizar Datos</button>
                </form>

                <button 
                    onClick={handleLogout} 
                    className="auth-button" 
                    style={{marginTop: '1rem', backgroundColor: '#6c757d', maxWidth: '500px', width: '100%'}}
                >
                    Cerrar Sesión (Logout)
                </button>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default ProfilePage;
