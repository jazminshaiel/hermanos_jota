import { useEffect, useMemo, useState } from "react";
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export function RelatedProducts({ productoActual, onProductClick }) {
	const [productos, setProductos] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`${API_URL}/api/productos`)
			.then((res) => {
				if (!res.ok) throw new Error("Error al cargar productos");
				return res.json();
			})
			.then((data) => {
				setProductos(data);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	const relacionados = useMemo(() => {
		const mismaCategoria = productos.filter(
			(p) =>
				p.id !== productoActual.id && p.categoria === productoActual.categoria
		);

		const otrosProductos = productos.filter(
			(p) =>
				p.id !== productoActual.id && p.categoria !== productoActual.categoria
		);

		const combinados = [...mismaCategoria, ...otrosProductos]
			.sort(() => Math.random() - 0.5)
			.slice(0, 4);

		return combinados;
	}, [productoActual, productos]);

	const precioFormateado = (precio) => {
		return new Intl.NumberFormat("es-AR", {
			style: "currency",
			currency: "ARS",
			minimumFractionDigits: 0,
		}).format(precio);
	};

	return (
		<section className="relacionados">
			<h2>Productos relacionados</h2>
			<div className="relacionados-grid">
				{relacionados.map((producto) => (
					<div
						key={producto.id}
						className="relacionado-item"
						onClick={() => onProductClick(producto)}
						style={{ cursor: "pointer" }}
					>
						<img src={producto.imagen} alt={producto.nombre} />
						<h3>{producto.nombre}</h3>
						<p className="precio">{precioFormateado(producto.precio)}</p>
					</div>
				))}
			</div>
		</section>
	);
}
