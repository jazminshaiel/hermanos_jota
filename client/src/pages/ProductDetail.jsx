import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { DetailedProduct } from "../components/DetailedProduct"; 
import "../styles/estilos-globales.css";
import "../styles/estilos-producto.css";
import "../styles/Footer.css";
import "../styles/estilos-detalle.css"; 

// Aceptamos los props que vienen de App.js
function ProductDetail({ carritoItems, agregarAlCarrito }) {
	const [producto, setProducto] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [eliminando, setEliminando] = useState(false); // Estado para el botón de borrar

	// Hooks de React Router
	const { id } = useParams(); // Hook para leer el ":id" de la URL
	const navigate = useNavigate(); // Hook para redirigir al usuario

	// Hook para cargar los datos del producto
	useEffect(() => {
		const fetchProducto = async () => {
			try {
				setLoading(true);
				// Usamos el endpoint del backend
				const response = await fetch(`/api/productos/${id}`);
				if (!response.ok) {
					throw new Error("El producto no fue encontrado.");
				}
				const data = await response.json();
				setProducto(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProducto();
	}, [id]); // Se ejecuta cada vez que el 'id' de la URL cambia

	// Funcionalidad de Borrado
	const handleEliminar = async () => {
		// Pedimos confirmación
		if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
			setEliminando(true);
			try {
				// Usamos el endpoint DELETE de tu API
				const response = await fetch(`/api/productos/${id}`, {
					method: "DELETE",
				});

				if (!response.ok) {
					throw new Error("No se pudo eliminar el producto.");
				}
				
				// Redirigimos al catálogo tras el borrado exitoso
				alert("Producto eliminado correctamente.");
				navigate("/catalogo"); 
			} catch (err) {
				setError(err.message);
				setEliminando(false);
			}
		}
	};

	// Lógica de renderizado
	let content;
	if (loading) {
		content = <p className="loading-message">Cargando producto...</p>;
	} else if (error) {
		content = <p className="error-message">{error}</p>;
	} else if (producto) {
		// Usamos <DetailedProduct> y le pasamos los props
		content = (
			<DetailedProduct
				producto={producto}
				agregarAlCarrito={agregarAlCarrito}
				onEliminar={handleEliminar}
				eliminando={eliminando}
			/>
		);
	}

	return (
		<>
			<Header carritoItems={carritoItems} />
			<main className="container">{content}</main>
			<Footer />
		</>
	);
}

export default ProductDetail;