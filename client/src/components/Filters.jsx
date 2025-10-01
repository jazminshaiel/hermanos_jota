import React from "react";

export default function Filters({ productos, categoria, setCategoria }) {
  const categorias = ["todos", ...new Set(productos.map(p => p.categoria))];

  return (
    <div className="contenedor-filtros">
      <label className="label-filtro" htmlFor="filtro-categoria">Filtrar por categoría:</label>
      <select
        id="filtro-categoria"
        className="select-filtro"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      >
        {categorias.map(cat => (
          <option key={cat} value={cat}>{cat === "todos" ? "Todas las categorías" : cat}</option>
        ))}
      </select>
    </div>
  );
}
