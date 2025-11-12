import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Importar el Contexto

function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext); // Usar la función 'login' del Contexto

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const dataError = await response.json();
                throw new Error(dataError.mensaje || 'Credenciales inválidas');
            }
            const data = await response.json();
            login(data.token); // Usar la función del Contexto para guardar
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Iniciar Sesión</h2>
                
                {/* --- CAMPOS DEL FORMULARIO --- */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email" // Debe coincidir con el estado
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
                        name="password" // Debe coincidir con el estado
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Mostrar error si existe */}
                {error && <p className="error-message">{error}</p>}

                <button type="submit" className="auth-button">Ingresar</button>
                
                <p className="auth-link">
                    ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
                </p>

            </form>
        </div>
    );
}
export default LoginPage;