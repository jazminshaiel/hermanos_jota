import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailedProduct } from "../components/DetailedProduct";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { RelatedProducts } from "../components/RelatedProducts";
import "../styles/estilos-globales.css";
import "../styles/estilos-producto.css";
import "../styles/Footer.css";

function ProductDetail({ carritoItems = 0, añadirAlCarrito }) {
	const params = useParams();
	const { id } = params;
	const navigate = useNavigate();
	const [producto, setProducto] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isDeleting, setIsDeleting] = useState(false);
	const [deleteError, setDeleteError] = useState(null);

	useEffect(() => {
		if (!id) {
			console.error("ID es undefined, no se puede hacer fetch");
			setError("ID de producto no válido");
			setLoading(false);
			return;
		}

		fetch(`http://localhost:3001/api/productos/${id}`)
			.then((res) => {
				if (!res.ok) throw new Error("Producto no encontrado");
				return res.json();
			})
			.then((data) => {
				setProducto(data);
				setLoading(false);
				setDeleteError(null);
				window.scrollTo(0, 0);
			})
			.catch((err) => {
				console.error("Error en fetch:", err);
				setError(err.message);
				setLoading(false);
			});
	}, [id]);

	const handleProductClick = (producto) => {
		navigate(`/producto/${producto.id}`);
	};

	const handleBackToCatalog = () => {
		navigate("/catalogo");
	};

	const handleDeleteProduct = async () => {
		if (!producto?.id) return;

		const confirmar = window.confirm(
			`¿Estás seguro de que querés eliminar "${producto.nombre}"?`
		);

		if (!confirmar) return;

		try {
			setIsDeleting(true);
			setDeleteError(null);

			const response = await fetch(
				`http://localhost:3001/api/productos/${producto.id}`,
				{
					method: "DELETE",
				},
			);

			if (!response.ok) {
				const body = await response.json().catch(() => ({}));
				throw new Error(body.error || "No se pudo eliminar el producto");
			}

			navigate("/catalogo");
		} catch (err) {
			console.error("Error al eliminar producto:", err);
			setDeleteError(err.message);
		} finally {
			setIsDeleting(false);
		}
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
			<Header carritoItems={carritoItems} />
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
				<DetailedProduct
					producto={producto}
					añadirAlCarrito={añadirAlCarrito}
					onEliminar={handleDeleteProduct}
					eliminando={isDeleting}
				/>
				{deleteError && (
					<p className="mensaje-error-eliminar">{deleteError}</p>
				)}
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
