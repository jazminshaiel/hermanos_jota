function ProductCard({ producto }) {
  const precioFormateado = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(producto.precio);
  return (
    <div className="carta-producto">
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
    </div>
  );
}

export default ProductCard;
