import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { CartProvider, useCart } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";

// PAGES
import Catalog from "./pages/Catalog";
import Contacto from "./pages/Contacto";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import CreateProductPage from "./pages/CreateProductPage";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

// COMPONENTS
import ModalCarrito from "./components/ModalCarrito";
import ScrollToTop from "./components/ScrollToTop";
import NotificationToast from "./components/NotificationToast";

// Componente interno que usa los Contexts
function AppContent() {
	const { agregarAlCarrito } = useCart();
	
	// Estado para el modal
	const [modalCarrito, setModalCarrito] = useState({
		isOpen: false,
		producto: null
	});

	// Estado para la notificación
	const [notificacion, setNotificacion] = useState({
		mostrar: false,
		mensaje: "",
	});

	// Función para mostrar notificación
	const mostrarNotificacion = (mensaje) => {
		setNotificacion({
			mostrar: true,
			mensaje: mensaje,
		});
	};

	// Función para cerrar notificación
	const cerrarNotificacion = () => {
		setNotificacion({
			mostrar: false,
			mensaje: "",
		});
	};

	// Wrapper para agregar al carrito con notificación y modal
	const añadirAlCarritoConNotificacion = (producto) => {
		agregarAlCarrito(producto);
		mostrarNotificacion(`${producto.nombre} agregado al carrito`);
		
		// Mostrar modal
		setModalCarrito({
			isOpen: true,
			producto: producto
		});
	};

	return (
		<>
			<ScrollToTop />
			<NotificationToast
				mensaje={notificacion.mensaje}
				mostrar={notificacion.mostrar}
				onCerrar={cerrarNotificacion}
			/>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/registro" element={<RegisterPage />} />
				
				{/* Página de home */}
				<Route 
					path="/" 
					element={
						<Home 
							añadirAlCarrito={añadirAlCarritoConNotificacion}
						/>
					} 
				/>

				{/* Página de catálogo */}
				<Route 
					path="/catalogo" 
					element={
						<Catalog 
							añadirAlCarrito={añadirAlCarritoConNotificacion}
						/>
					} 
				/>

				{/* Página de contacto */}
				<Route path="/contacto" element={<Contacto />} />

				{/* Página de detalle de producto */}
				<Route 
					path="/producto/:id" 
					element={
						<ProductDetail 
							añadirAlCarrito={añadirAlCarritoConNotificacion}
						/>
					} 
				/>

				{/* Página del carrito */}
				<Route 
					path="/carrito" 
					element={<Cart />}
				/>

				<Route element={<ProtectedRoute />}>
					<Route path="/perfil" element={<ProfilePage />} />
					<Route 
						path="/admin/crear-producto" 
						element={<CreateProductPage />} 
					/>
				</Route>
			</Routes>
			
			{/* Modal de Carrito */}
			<ModalCarrito 
				isOpen={modalCarrito.isOpen}
				onClose={() => setModalCarrito({ isOpen: false, producto: null })}
				producto={modalCarrito.producto}
			/>
		</>
	);
}

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<CartProvider>
					<AppContent />
				</CartProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
