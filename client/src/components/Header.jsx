import { useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

const Header = () => {
	const { usuario, logout } = useAuth();
	const { cantidadTotal } = useCart();

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
					{usuario ? (
						<>
							{/* El "cartel" con el nombre de usuario */}
							<Link to="/perfil" className="user-info-link">
								<span>Hola, <strong>{usuario.nombre || usuario.username || 'Usuario'}</strong></span>
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
					
					<Link to="/carrito" className="icon-link carrito-icon">
						<i className="fa-solid fa-shopping-cart"></i>
						{cantidadTotal > 0 && (
							<span className="carrito-badge">{cantidadTotal}</span>
						)}
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
