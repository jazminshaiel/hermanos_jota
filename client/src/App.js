import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Catalog from "./pages/Catalog";
import Home from "./pages/Home";
import Contacto from "./pages/Contacto";
import Cart from "./pages/Cart";

function App() {
  // Estado global del carrito
  const [carrito, setCarrito] = useState([]);

  // Función para agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      // Verificar si el producto ya existe en el carrito
      const productoExistente = prevCarrito.find(
        (item) => item.id === producto.id
      );

      if (productoExistente) {
        // Si existe, incrementar la cantidad
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si no existe, agregarlo con cantidad 1
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Función para eliminar producto del carrito
  const eliminarDelCarrito = (productoId) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((item) => item.id !== productoId)
    );
  };

  // Función para actualizar cantidad de un producto
  const actualizarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(productoId);
    } else {
      setCarrito((prevCarrito) =>
        prevCarrito.map((item) =>
          item.id === productoId ? { ...item, cantidad: nuevaCantidad } : item
        )
      );
    }
  };

  // Función para vaciar el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Calcular cantidad total de items en el carrito
  const cantidadTotal = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* Página de home */}
        <Route path="/" element={<Home cantidadCarrito={cantidadTotal} />} />

        {/* Página de catálogo */}
        <Route
          path="/catalogo"
          element={
            <Catalog
              agregarAlCarrito={agregarAlCarrito}
              cantidadCarrito={cantidadTotal}
            />
          }
        />

        {/* Página de contacto */}
        <Route
          path="/contacto"
          element={<Contacto cantidadCarrito={cantidadTotal} />}
        />

        {/* Página de carrito */}
        <Route
          path="/carrito"
          element={
            <Cart
              carrito={carrito}
              eliminarDelCarrito={eliminarDelCarrito}
              actualizarCantidad={actualizarCantidad}
              vaciarCarrito={vaciarCarrito}
              cantidadCarrito={cantidadTotal}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;