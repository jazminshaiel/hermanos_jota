import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

function ProfilePage() {
    // Obtener los datos del usuario actual del Contexto
    // 'logout'
    const { currentUser, logout } = useContext(AuthContext); 
    
    // 2. Estado local para el formulario
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Cargar datos del usuario en el formulario
    useEffect(() => {
        if (currentUser) {
            setUsername(currentUser.username);
        }
    }, [currentUser]);

    // Lógica para el submit 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ username, password: password || undefined })
            });
            if (!response.ok) {
                 const dataError = await response.json();
                 throw new Error(dataError.mensaje || 'Error al actualizar');
            }
            setSuccess('¡Perfil actualizado! (Necesitarás re-loguear para ver los cambios)');
        } catch (err) {
            setError(err.message);
        }
    };

    // Si el usuario no se ha cargado
    if (!currentUser) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Mi Perfil</h2>
                <p>Hola, {currentUser.username}. Aquí puedes actualizar tus datos.</p>
                
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
                {success && <p style={{color: 'green'}}>{success}</p>}

                <button type="submit" className="auth-button">Actualizar Datos</button>
            </form>

            <button 
                onClick={logout} 
                className="auth-button" 
                style={{marginTop: '1rem', backgroundColor: '#dc3545', borderColor: '#dc3545'}}
            >
                Cerrar Sesión (Logout)
            </button>
        </div>
    );
}

export default ProfilePage;