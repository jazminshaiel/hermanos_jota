import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { CartProvider, useCart } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import Catalog from "./pages/Catalog";
import Home from "./pages/Home";
import Contacto from "./pages/Contacto";
import Cart from "./pages/Cart";
import NotificationToast from "./components/NotificationToast";

// Componente interno que usa el Context
function AppContent() {
  const { agregarAlCarrito } = useCart();
  
  // Estado para la notificación
  const [notificacion, setNotificacion] = useState({
    mostrar: false,
    mensaje: "",
  });

  // Función para mostrar notificación
  const mostrarNotificacion = (mensaje) => {
    setNotificacion({
      mostrar: true,
      mensaje: mensaje,
    });
  };

  // Función para cerrar notificación
  const cerrarNotificacion = () => {
    setNotificacion({
      mostrar: false,
      mensaje: "",
    });
  };

  // Wrapper para agregar al carrito con notificación
  const agregarAlCarritoConNotificacion = (producto) => {
    agregarAlCarrito(producto);
    mostrarNotificacion(`${producto.nombre} agregado al carrito`);
  };

  return (
    <>
      <NotificationToast
        mensaje={notificacion.mensaje}
        mostrar={notificacion.mostrar}
        onCerrar={cerrarNotificacion}
      />
      <Routes>
        {/* Página de home */}
        <Route path="/" element={<Home />} />

        {/* Página de catálogo */}
        <Route
          path="/catalogo"
          element={<Catalog agregarAlCarrito={agregarAlCarritoConNotificacion} />}
        />

        {/* Página de contacto */}
        <Route path="/contacto" element={<Contacto />} />

        {/* Página de carrito */}
        <Route path="/carrito" element={<Cart />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
