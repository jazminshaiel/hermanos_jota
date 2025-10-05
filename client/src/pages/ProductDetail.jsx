import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailedProduct } from "../components/DetailedProduct";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { RelatedProducts } from "../components/RelatedProducts";
import "../styles/estilos-globales.css";
import "../styles/estilos-producto.css";

function ProductDetail() {
	const params = useParams();
	const { id } = params;
	const navigate = useNavigate();
	const [producto, setProducto] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!id) {
			console.error("ID es undefined, no se puede hacer fetch");
			setError("ID de producto no válido");
			setLoading(false);
			return;
		}

		fetch(`http://localhost:3001/api/productos/${id}`)
			.then((res) => {
				console.log("Response status:", res.status);
				if (!res.ok) throw new Error("Producto no encontrado");
				return res.json();
			})
			.then((data) => {
				console.log("Producto cargado:", data);
				setProducto(data);
				setLoading(false);
				window.scrollTo(0, 0);
			})
			.catch((err) => {
				console.error("Error en fetch:", err);
				setError(err.message);
				setLoading(false);
			});
	}, [id]);

	const handleProductClick = (producto) => {
		console.log(
			"handleProductClick - Navegando a:",
			`/producto/${producto.id}`
		);
		navigate(`/producto/${producto.id}`);
	};

	const handleBackToCatalog = () => {
		navigate("/catalogo");
	};

	if (loading)
		return (
			<p style={{ textAlign: "center", padding: "40px" }}>
				Cargando producto...
			</p>
		);
	if (error)
		return (
			<p style={{ textAlign: "center", padding: "40px", color: "red" }}>
				{error}
			</p>
		);
	if (!producto)
		return (
			<p style={{ textAlign: "center", padding: "40px" }}>
				Producto no encontrado
			</p>
		);

	return (
		<>
			<Header />
			<div className="productDetail-div">
				<button
					className="backToCatalogButton"
					onClick={handleBackToCatalog}
					onMouseOver={(e) => (e.target.style.backgroundColor = "#8b4513")}
					onMouseOut={(e) => (e.target.style.backgroundColor = "#a0522d")}
				>
					← Volver al catálogo
				</button>
			</div>
			<div>
				<DetailedProduct producto={producto} />
				<RelatedProducts
					productoActual={producto}
					onProductClick={handleProductClick}
				/>
			</div>
			<Footer />
		</>
	);
}

export default ProductDetail;
