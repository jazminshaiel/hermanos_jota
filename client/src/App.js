import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalog from "./pages/Catalog";
import Home from "./pages/Home";
import Contacto from "./pages/Contacto";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
     <BrowserRouter>
      <Routes>
        
        {/* Página de home */}
        <Route path="/" element={<Home />} />

        {/* Página de catálogo */}
        <Route path="/catalogo" element={<Catalog />} />

        {/* Página de contacto */}
        <Route path="/contacto" element={<Contacto />} />

        <Route path="/producto" element={<ProductDetail/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;