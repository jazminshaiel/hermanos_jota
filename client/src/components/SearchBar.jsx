import React from "react";

export default function SearchBar({ termino, setTermino }) {
  return (
    <div className="contenedor-busqueda">
      <input
        id="busquedaInput"
        className="input-busqueda"
        value={termino}
        onChange={(e) => setTermino(e.target.value)}
        placeholder="Buscar productos por nombre o descripción..."
        aria-label="Buscar productos"
      />
      <button className="btn-busqueda" onClick={() => { /* opcional */ }}>
        <i className="fas fa-search"></i> Buscar
      </button>
    </div>
  );
}
