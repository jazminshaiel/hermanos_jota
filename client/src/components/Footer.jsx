import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Columna 1: Logo e Información */}
                <div className="footer-col">
                    <img src="/img/logo.svg" alt="Hermanos Jota" className="footer-logo" />
                    <div className="footer-info">
                        <p>Hermanos Jota - Casa Taller</p>
                        <p>Av. San Juan 2847</p>
                        <p>C1232AAB - San Cristóbal</p>
                        <p>Buenos Aires, Argentina</p>
                    </div>
                </div>

                {/* Columna 2: Contacto */}
                <div className="footer-col">
                    <h4>Contacto</h4>
                    <div className="footer-links">
                        <p>+54 11 4567-8901</p>
                        <p>info@hermanosjota.com.ar</p>
                        <p>contacto@hermanosjota.com</p>
                        <p>ventas@hermanosjota.com.ar</p>
                    </div>
                </div>

                {/* Columna 3: Redes Sociales */}
                <div className="footer-col">
                    <h4>Redes Sociales</h4>
                    <div className="footer-links">
                        <a href="https://instagram.com/hermanosjota_ba" target="_blank" rel="noreferrer">
                            Instagram: @hermanosjota_ba
                        </a>
                    </div>
                </div>

                {/* Columna 4: Ayuda */}
                <div className="footer-col">
                    <h4>Ayuda</h4>
                    <div className="footer-links">
                        <Link to="/pagos">Métodos de pago</Link>
                        <Link to="/cambios">Cambios y devoluciones</Link>
                        <Link to="/privacidad">Políticas de privacidad</Link>
                    </div>
                    
                    <div className="footer-newsletter">
                        <h4>Newsletter</h4>
                        <input type="email" placeholder="Tu email" />
                        <button>Suscribirse</button>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>Copyright © 2025 Hermanos Jota. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;

