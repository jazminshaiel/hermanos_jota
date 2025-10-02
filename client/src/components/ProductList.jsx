import ProductCard from "./ProductCard";

function ProductList({ productos }) {
  return (
    <div className="contenedor-productos">
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
}

export default ProductList;