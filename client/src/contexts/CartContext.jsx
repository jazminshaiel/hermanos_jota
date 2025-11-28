import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Cargar carrito desde localStorage al iniciar
  const [carrito, setCarrito] = useState(() => {
    if (typeof window !== 'undefined') {
      const carritoGuardado = localStorage.getItem('carrito');
      return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    }
    return [];
  });

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (carrito.length > 0) {
        localStorage.setItem('carrito', JSON.stringify(carrito));
      } else {
        localStorage.removeItem('carrito');
      }
    }
  }, [carrito]);

  // Limpiar el carrito cuando el usuario cierra sesión (se elimina el token)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkAuthStatus = () => {
        const token = localStorage.getItem('token');
        // Si no hay token y hay items en el carrito, limpiar el carrito
        if (!token && carrito.length > 0) {
          setCarrito([]);
        }
      };

      // Verificar el estado de autenticación cada vez que cambie el carrito
      checkAuthStatus();

      // También escuchar eventos personalizados cuando se hace logout
      const handleLogout = () => {
        setCarrito([]);
      };

      window.addEventListener('userLogout', handleLogout);

      return () => {
        window.removeEventListener('userLogout', handleLogout);
      };
    }
  }, [carrito]);

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

  // Calcular total del carrito
  const totalCarrito = carrito.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  const value = {
    carrito,
    cantidadTotal,
    totalCarrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

