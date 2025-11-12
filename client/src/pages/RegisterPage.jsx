import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// componentes y estilos
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/estilos-auth.css'; 

function RegisterPage() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await axios.post('/api/auth/registro', formData);
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.mensaje || 'Error al registrar');
        }
    };

    return (
        <>
            <Header />
            
            <main className="auth-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>Crear Cuenta</h2>
                    
                    <div className="form-group">
                        <label htmlFor="username">Nombre de Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="auth-button">Registrarse</button>
                    
                    <p className="auth-link">
                        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
                    </p>
                </form>
            </main>

            <Footer />
        </>
    );
}

export default RegisterPage;