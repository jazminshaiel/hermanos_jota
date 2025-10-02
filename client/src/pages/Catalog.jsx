import { useState, useEffect } from "react";
import "../styles/estilos-catalogo.css";
import "../styles/estilos-globales.css";


// Header Y Footer
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 

// COMPONENTES
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import ProductList from "../components/ProductList";

function Catalog() {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/productos")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then((data) => {
        setProductos(data);
        setFilteredProductos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filtrar productos cuando cambien búsqueda o categoría
  useEffect(() => {
    let resultados = productos;

    if (searchTerm) {
      resultados = resultados.filter((p) =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "todos") {
      resultados = resultados.filter((p) => p.categoria === selectedCategory);
    }

    setFilteredProductos(resultados);
  }, [searchTerm, selectedCategory, productos]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="catalogo-container">
      <Header />
      <h1 className="titulo-catalogo">Nuestro Catálogo</h1>

      {/* Barra de búsqueda */}
      <SearchBar setSearchTerm={setSearchTerm} />

      {/* Filtros */}
      <Filters
        productos={productos}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Info resultados */}
      <div className="resultados-info">
        {filteredProductos.length > 0 ? (
          <p>
            Mostrando {filteredProductos.length} de {productos.length} productos
          </p>
        ) : (
          <p className="no-results">No se encontraron productos.</p>
        )}
      </div>

      {/* Lista de productos */}
      <ProductList productos={filteredProductos} />
      <Footer />
    </div>
  );
}

export default Catalog;