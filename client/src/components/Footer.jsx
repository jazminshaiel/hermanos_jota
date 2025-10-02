import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // Clase 'footer'
    <footer className="footer">
      <div className="container">

        {/* Logo e info de empresa */} 
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
            <p>C1232AAB - Barrio de San Cristóbal</p>
            <p>Ciudad Autónoma de Buenos Aires</p>
            <p>Argentina</p>
            <p>+54 11 4567-8901</p>
            <p>contacto@hermanosjota.com</p>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="footer-section">
            <h4>Redes Sociales</h4>
            <a href="https://instagram.com/hermanosjota" target="_blank" rel="noreferrer">Instagram: @hermanosjota_ba</a>
          </div>

          {/* Ayuda + Newsletter */}
          <div className="footer-section">
            <h4>Ayuda</h4>
            <Link to="/pagos">Métodos de pago</Link>
            <Link to="/cambios">Cambios y devoluciones</Link>
            <Link to="/privacidad">Politicas de privacidad</Link>
            
            <div className="newsletter">
            <h4>Newsletter</h4>
            <div className="newsletter-input">
              <input type="email" placeholder="Ingresá tu email" />
              <button>Suscribirse</button>
            </div>
          </div>

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