import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Catalog from "./pages/Catalog";
import Contacto from "./pages/Contacto";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import ModalCarrito from "./components/ModalCarrito";

function App() {
	// Estado global del carrito
	const [carrito, setCarrito] = useState([]);
	
	// Estado para el modal
	const [modalCarrito, setModalCarrito] = useState({
		isOpen: false,
		producto: null
	});

	// Función para añadir producto al carrito
	const añadirAlCarrito = (producto) => {
		setCarrito(prevCarrito => {
			// Verificar si el producto ya está en el carrito
			const productoExistente = prevCarrito.find(item => item.id === producto.id);
			
			if (productoExistente) {
				// Si ya existe, incrementar la cantidad
				return prevCarrito.map(item =>
					item.id === producto.id
						? { ...item, cantidad: item.cantidad + 1 }
						: item
				);
			} else {
				// Si no existe, agregarlo con cantidad 1
				return [...prevCarrito, { ...producto, cantidad: 1 }];
			}
		});
		
		// Mostrar modal
		setModalCarrito({
			isOpen: true,
			producto: producto
		});
	};

	// Función para remover producto del carrito
	const removerDelCarrito = (productoId) => {
		setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== productoId));
	};

	// Función para actualizar cantidad de un producto
	const actualizarCantidad = (productoId, nuevaCantidad) => {
		if (nuevaCantidad <= 0) {
			removerDelCarrito(productoId);
			return;
		}
		
		setCarrito(prevCarrito =>
			prevCarrito.map(item =>
				item.id === productoId
					? { ...item, cantidad: nuevaCantidad }
					: item
			)
		);
	};

	// Calcular total de items en el carrito
	const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

	return (
		<BrowserRouter>
			<Routes>
				{/* Página de home */}
				<Route 
					path="/" 
					element={
						<Home 
							carritoItems={totalItems}
							añadirAlCarrito={añadirAlCarrito}
						/>
					} 
				/>

				{/* Página de catálogo */}
				<Route 
					path="/catalogo" 
					element={
						<Catalog 
							carritoItems={totalItems}
							añadirAlCarrito={añadirAlCarrito}
						/>
					} 
				/>

				{/* Página de contacto */}
				<Route path="/contacto" element={<Contacto carritoItems={totalItems} />} />

				{/* Página de detalle de producto */}
				<Route 
					path="/producto/:id" 
					element={
						<ProductDetail 
							carritoItems={totalItems}
							añadirAlCarrito={añadirAlCarrito}
						/>
					} 
				/>

				{/* Página del carrito */}
				<Route 
					path="/carrito" 
					element={
						<Cart 
							carrito={carrito}
							removerDelCarrito={removerDelCarrito}
							actualizarCantidad={actualizarCantidad}
							carritoItems={totalItems}
						/>
					} 
				/>
			</Routes>
			
			{/* Modal de Carrito */}
			<ModalCarrito 
				isOpen={modalCarrito.isOpen}
				onClose={() => setModalCarrito({ isOpen: false, producto: null })}
				producto={modalCarrito.producto}
			/>
		</BrowserRouter>
	);
}

export default App;
