import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // Clase 'footer'
    <footer className="footer">
      <div className="container"> 
        <div className="footer-content-wrapper">
          
          <div className="footer-section">
            <div className="footer-logo">
              <img
                src="/img/logo.svg" 
                alt="Hermanos Jota Logo"
                className="footer-logo-image"
              />
            </div>
            <div className="company-info">
              <p>Hermanos Jota - Casa Taller</p>
              <p>Av. San Juan 2847</p>
              {/* ... más info ... */}
            </div>
          </div>

          <div className="footer-section">
            <h4>Redes Sociales</h4>
            <a href="URL_INSTAGRAM" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>

          <div className="footer-section">
            <h4>Ayuda</h4>
            <Link to="/pagos">Métodos de pago</Link>
            <Link to="/cambios">Cambios y devoluciones</Link>
            <Link to="/privacidad">Politicas de privacidad</Link>
            {/* ... Newsletter ... */}
          </div>

        </div> 
      </div>

      <div className="copyright-bar">
        <p>Copyright © 2025 Hermanos Jota. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;