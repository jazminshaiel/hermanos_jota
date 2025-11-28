import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Cargar token y usuario desde localStorage al iniciar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tokenGuardado = localStorage.getItem('token');
      const usuarioGuardado = localStorage.getItem('usuario');

      if (tokenGuardado && usuarioGuardado) {
        setToken(tokenGuardado);
        setUsuario(JSON.parse(usuarioGuardado));
      }
    }
    setCargando(false);
  }, []);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al iniciar sesión');
      }

      const data = await response.json();
      const { token: nuevoToken, usuario: usuarioData } = data;

      // Guardar en localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', nuevoToken);
        localStorage.setItem('usuario', JSON.stringify(usuarioData));
      }

      setToken(nuevoToken);
      setUsuario(usuarioData);

      return { exito: true };
    } catch (error) {
      return { exito: false, error: error.message };
    }
  };

  // Función para registrar usuario
  const register = async (nombre, email, password) => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al registrar usuario');
      }

      const data = await response.json();
      const { token: nuevoToken, usuario: usuarioData } = data;

      // Guardar en localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', nuevoToken);
        localStorage.setItem('usuario', JSON.stringify(usuarioData));
      }

      setToken(nuevoToken);
      setUsuario(usuarioData);

      return { exito: true };
    } catch (error) {
      return { exito: false, error: error.message };
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
    }
    setToken(null);
    setUsuario(null);
  };

  // Verificar si el usuario está autenticado
  const estaAutenticado = !!token && !!usuario;

  const value = {
    usuario,
    token,
    cargando,
    estaAutenticado,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

