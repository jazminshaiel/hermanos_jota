import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// componentes y estilos
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/estilos-auth.css';

function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        const resultado = await login(formData.email, formData.password);
        
        if (resultado.exito) {
            navigate('/perfil');
        } else {
            setError(resultado.error || 'Credenciales inválidas');
        }
    };

    return (
        <>
            <Header />
            
            <main className="auth-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>Iniciar Sesión</h2>
                    <p className="auth-subtitle">Ingresa tus credenciales para acceder a tu cuenta</p>
                    
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <div className="input-wrapper">
                            <i className="fa-solid fa-envelope input-icon"></i>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="tu@email.com"
                                required
                                className={error ? 'error' : ''}
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <div className="input-wrapper">
                            <i className="fa-solid fa-lock input-icon"></i>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Ingresa tu contraseña"
                                required
                                className={error ? 'error' : ''}
                            />
                        </div>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="auth-button">
                        <i className="fa-solid fa-sign-in-alt" style={{ marginRight: '8px' }}></i>
                        Iniciar Sesión
                    </button>
                    
                    <p className="auth-link">
                        ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
                    </p>
                </form>
            </main>

            <Footer />
        </>
    );
}

export default LoginPage;
