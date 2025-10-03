import React from "react";
import { Link } from "react-router-dom";

const Header = ({ cantidadCarrito = 0 }) => {
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
          <Link to="/carrito" className="icon-link carrito-icon">
            <i className="fa-solid fa-shopping-cart"></i>
            {cantidadCarrito > 0 && (
              <span className="carrito-badge">{cantidadCarrito}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;