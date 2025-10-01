import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ productos }) {
  if (!productos || productos.length === 0) {
    return <div className="no-results">No se encontraron productos.</div>;
  }

  return (
    <div className="contenedor-productos">
      {productos.map(producto => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
}

export default ProductList;
