function ProductCard({ producto }) {
  return (
    <div className="carta-producto">
      <div className="imagen-contenedor">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        onError={(e) =>
          (e.target.src =
            "https://jazminshaiel.github.io/hermanos_jota/img/placeholder.png")
        }
      />
       </div>
      <div className="info-producto">
        <h2>{producto.nombre}</h2>
        <p>{producto.descripcion}</p>
        <span className="precio-producto">{producto.precio}</span>
      </div>
    </div>
  );
}

export default ProductCard;