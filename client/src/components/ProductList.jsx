import ProductCard from "./ProductCard";

function ProductList({ productos, onProductClick, agregarAlCarrito }) {
	return (
		<div className="contenedor-productos">
			{productos.map((producto) => (
				<ProductCard
					key={producto.id}
					producto={producto}
					onClick={onProductClick}
					agregarAlCarrito={agregarAlCarrito}
				/>
			))}
		</div>
	);
}

export default ProductList;
