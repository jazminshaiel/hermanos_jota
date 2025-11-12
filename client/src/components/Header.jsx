import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = ({ carritoItems = 0 }) => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    // Clase 'header'
    <header className="header">
      <div className="container">
        <div className="logo">
          <img
            src="/img/logo.svg"
            alt="Hermanos Jota Logo"
            className="logo-image"
          />
        </div>

        <nav className="nav">
          {/* Rutas de navegación */}
          <Link to="/">Inicio</Link>
          <Link to="/catalogo">Productos</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>

        <div className="header-icons">
          {currentUser ? (
            <>
              {/* El "cartel" con el nombre de usuario */}
              <Link to="/perfil" className="user-info-link">
                <span>Hola, <strong>{currentUser.username}</strong></span>
              </Link>
              
              {/* El botón de logout separado */}
              <a href="#!" onClick={logout} className="logout-link">
                Logout
              </a>
            </>
          ) : (
            // El link de login cuando no hay nadie
            <Link to="/login" className="login-link">
              Login
            </Link>
          )}
          
          <Link to="/carrito" className="icon-link carrito-link">
            <svg 
              className="carrito-icon" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M7 18C5.9 18 5.01 18.9 5.01 20S5.9 22 7 22 8.99 21.1 8.99 20 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5H5.21L4.27 3H1V2ZM17 18C15.9 18 15.01 18.9 15.01 20S15.9 22 17 22 18.99 21.1 18.99 20 18.1 18 17 18Z" 
                fill="currentColor"
              />
            </svg>
            {carritoItems > 0 && (
              <span className="contador-carrito">{carritoItems}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;