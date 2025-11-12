import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

// componentes y estilos
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/estilos-auth.css';

function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.post('/api/auth/login', formData);
            
            if (response.data.token) {
                login(response.data.token); // La función del context guarda y redirige
            }
        } catch (err) {
            setError(err.response?.data?.mensaje || 'Credenciales inválidas');
        }
    };

    return (
        <>
            <Header />
            
            <main className="auth-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>Iniciar Sesión</h2>
                    
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

                    <button type="submit" className="auth-button">Ingresar</button>
                    
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