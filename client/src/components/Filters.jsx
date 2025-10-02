function Filters({ productos, selectedCategory, setSelectedCategory }) {
  // Extraer categorías únicas desde los productos
  const categorias = ["todos", ...new Set(productos.map((p) => p.categoria))];

  return (
    <div className="contenedor-filtros">
      <label htmlFor="filtro-categoria" className="label-filtro">
        Filtrar por categoría:
      </label>
      <select
        id="filtro-categoria"
        className="select-filtro"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categorias.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filters;