import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/estilos-catalogo.css";
import "../styles/estilos-globales.css";
import "../styles/Footer.css";

// Header Y Footer
import Footer from "../components/Footer";
import Header from "../components/Header";

// COMPONENTES
import Filters from "../components/Filters";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function Catalog({ agregarAlCarrito }) {
	const navigate = useNavigate();
	const [productos, setProductos] = useState([]);
	const [filteredProductos, setFilteredProductos] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("todos");
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch(`${API_URL}/api/productos`)
			.then((res) => {
				if (!res.ok) throw new Error("Error al cargar productos");
				return res.json();
			})
			.then((data) => {
				setProductos(data);
				setFilteredProductos(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	// Filtrar productos cuando cambien búsqueda o categoría
	useEffect(() => {
		let resultados = productos;

		if (searchTerm) {
			resultados = resultados.filter(
				(p) =>
					p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
					p.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		if (selectedCategory !== "todos") {
			resultados = resultados.filter((p) => p.categoria === selectedCategory);
		}

		setFilteredProductos(resultados);
	}, [searchTerm, selectedCategory, productos]);

	// Manejador para cuando se hace clic en una tarjeta de producto - mostrar modal
	const handleProductClick = (producto) => {
		setSelectedProduct(producto);
	};

	// Manejador para cerrar el detalle del producto
	const handleCloseDetail = () => {
		setSelectedProduct(null);
	};

	// Manejador para ver detalles completos (navegar a página de detalle)
	const handleVerDetalles = (producto) => {
		navigate(`/producto/${producto.id}`);
	};

	// Manejador para agregar al carrito desde el modal
	const handleAgregarAlCarrito = (producto) => {
		if (agregarAlCarrito) {
			agregarAlCarrito(producto);
		}
		// Cerrar el modal después de agregar
		handleCloseDetail();
	};

	if (loading) return <p>Cargando productos...</p>;
	if (error) return <p style={{ color: "red" }}>{error}</p>;

	return (
		<div className="catalogo-container">
			<Header />
			<h1 className="titulo-catalogo">Nuestro Catálogo</h1>

			{/* Barra de búsqueda */}
			<SearchBar setSearchTerm={setSearchTerm} />

			{/* Filtros */}
			<Filters
				productos={productos}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
			/>

			{/* Info resultados */}
			<div className="resultados-info">
				{filteredProductos.length > 0 ? (
					<p>
						Mostrando {filteredProductos.length} de {productos.length} productos
					</p>
				) : (
					<p className="no-results">No se encontraron productos.</p>
				)}
			</div>

			{/* Lista de productos */}
			<ProductList
				productos={filteredProductos}
				onProductClick={handleProductClick}
				agregarAlCarrito={agregarAlCarrito}
			/>

			{/* Modal de detalle del producto */}
			{selectedProduct && (
				<div className="modal-overlay" onClick={handleCloseDetail}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<button className="close-button" onClick={handleCloseDetail}>
							✕
						</button>
						<div className="product-detail">
							<img
								src={selectedProduct.imagen}
								alt={selectedProduct.nombre}
								onError={(e) =>
									(e.target.src =
										"https://jazminshaiel.github.io/hermanos_jota/img/placeholder.png")
								}
							/>
							<div className="product-info">
								<h2>{selectedProduct.nombre}</h2>
								<p className="category">{selectedProduct.categoria}</p>
								<p className="description">{selectedProduct.descripcion}</p>
								<p className="price">
									{new Intl.NumberFormat("es-AR", {
										style: "currency",
										currency: "ARS",
										minimumFractionDigits: 0,
									}).format(selectedProduct.precio)}
								</p>
								<button
									className="add-to-cart-button"
									onClick={() => handleAgregarAlCarrito(selectedProduct)}
								>
									Agregar al carrito
								</button>
								<button
									className="add-to-cart-button"
									style={{ marginTop: '10px', backgroundColor: '#666' }}
									onClick={() => handleVerDetalles(selectedProduct)}
								>
									Ver detalles completos
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			<Footer />
		</div>
	);
}

export default Catalog;
