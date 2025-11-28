import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// componentes y estilos
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/estilos-auth.css'; 

function RegisterPage() {
    const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        const resultado = await register(formData.nombre, formData.email, formData.password);
        
        if (resultado.exito) {
            navigate('/perfil');
        } else {
            setError(resultado.error || 'Error al registrar');
        }
    };

    return (
        <>
            <Header />
            
            <main className="auth-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>Crear Cuenta</h2>
                    <p className="auth-subtitle">Completa el formulario para registrarte en nuestra plataforma</p>
                    
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre Completo</label>
                        <div className="input-wrapper">
                            <i className="fa-solid fa-user input-icon"></i>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Ingresa tu nombre completo"
                                required
                                className={error ? 'error' : ''}
                            />
                        </div>
                    </div>
                    
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
                                placeholder="Mínimo 6 caracteres"
                                required
                                minLength={6}
                                className={error ? 'error' : ''}
                            />
                        </div>
                        <div className="password-requirements">
                            <small>La contraseña debe tener al menos 6 caracteres</small>
                        </div>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="auth-button">
                        <i className="fa-solid fa-user-plus" style={{ marginRight: '8px' }}></i>
                        Crear Cuenta
                    </button>
                    
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
