import ProductCard from "./ProductCard";

function ProductList({ productos, onProductClick, añadirAlCarrito }) {
	return (
		<div className="contenedor-productos">
			{productos.map((producto) => (
				<ProductCard
					key={producto.id}
					producto={producto}
					onClick={onProductClick}
					añadirAlCarrito={añadirAlCarrito}
				/>
			))}
		</div>
	);
}

export default ProductList;
