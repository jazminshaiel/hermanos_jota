import ProductCard from "./ProductCard";

function ProductList({ productos, onProductClick }) {
	return (
		<div className="contenedor-productos">
			{productos.map((producto) => (
				<ProductCard
					key={producto.id}
					producto={producto}
					onClick={onProductClick}
				/>
			))}
		</div>
	);
}

export default ProductList;
