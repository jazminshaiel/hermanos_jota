import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

// componentes y estilos
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/estilos-auth.css';

function ProfilePage() {
    const { currentUser, logout } = useContext(AuthContext);
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setUsername(currentUser.username);
        }
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        
        try {
            const token = localStorage.getItem('token');
            const updateBody = { username };
            if (password) {
                updateBody.password = password;
            }

            await axios.put(
                '/api/users/profile', 
                updateBody,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );
            
            setSuccess('¡Perfil actualizado! (Necesitarás re-loguear para ver los cambios)');
            setPassword('');
        } catch (err) {
            setError(err.response?.data?.mensaje || 'Error al actualizar');
        }
    };

    if (!currentUser) {
        return <p>Cargando...</p>;
    }

    return (
        <>
            <Header />
            
            <main className="auth-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>Mi Perfil</h2>
                    <p style={{textAlign: 'center', margin: '-1rem 0 1.5rem 0', fontFamily: '"Inter", sans-serif'}}>
                        Hola, {currentUser.username}. Aquí puedes actualizar tus datos.
                    </p>
                    
                    <div className="form-group">
                        <label htmlFor="username">Nombre de Usuario</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                    onClick={logout} 
                    className="auth-button" 
                    style={{marginTop: '1rem', backgroundColor: '#6c757d', maxWidth: '500px', width: '100%'}}
                >
                    Cerrar Sesión (Logout)
                </button>
            </main>

            <Footer />
        </>
    );
}

export default ProfilePage;