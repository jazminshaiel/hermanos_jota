import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalog from "./pages/Catalog";
import Home from "./pages/Home";
import Contacto from "./pages/Contacto";

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;