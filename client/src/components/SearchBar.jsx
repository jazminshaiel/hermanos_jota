function SearchBar({ setSearchTerm }) {
  return (
    <div className="seccion-busqueda">
      <div className="contenedor-busqueda">
        <input
          type="text"
          className="input-busqueda"
          placeholder="Buscar productos..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn-busqueda" type="button">
          Buscar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;