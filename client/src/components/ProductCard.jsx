function ProductCard({ producto, onClick, añadirAlCarrito }) {
	const precioFormateado = new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
		minimumFractionDigits: 0,
	}).format(producto.precio);

	const handleAñadirAlCarrito = (e) => {
		e.stopPropagation(); // Evitar que se ejecute el onClick del contenedor
		if (añadirAlCarrito) {
			añadirAlCarrito(producto);
		}
	};

	return (
		<div className="carta-producto" onClick={() => onClick(producto)}>
			<img
				src={producto.imagen}
				alt={producto.nombre}
				onError={(e) =>
					(e.target.src =
						"https://jazminshaiel.github.io/hermanos_jota/img/placeholder.png")
				}
			/>
			<div className="info-producto">
				<h2>{producto.nombre}</h2>
				<p>{producto.descripcion}</p>
				<span className="precio-producto">{precioFormateado}</span>
			</div>
			<button 
				className="boton-carrito" 
				onClick={handleAñadirAlCarrito}
			>
				Añadir al carrito
			</button>
		</div>
	);
}

export default ProductCard;
