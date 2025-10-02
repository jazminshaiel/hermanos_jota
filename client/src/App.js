import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalog from "./pages/Catalog";

function App() {
  return (
     <BrowserRouter>
      <Routes>
        {/* Página de catálogo */}
        <Route path="/catalogo" element={<Catalog />} />
        
        {/* Podés agregar más rutas después */}
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/contacto" element={<Contacto />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;