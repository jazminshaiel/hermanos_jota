import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/estilos-globales.css";
import "../styles/Footer.css";
import "../styles/estilos-carrito.css";

function Cart() {
  const {
    carrito,
    cantidadTotal,
    totalCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
  } = useCart();

  const { estaAutenticado, token } = useAuth();
  const navigate = useNavigate();
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState(null);

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(precio);
  };

  const handleFinalizarCompra = async () => {
    // Verificar si el usuario está autenticado
    if (!estaAutenticado) {
      setError('Debes iniciar sesión para finalizar la compra');
      // Redirigir a login (puedes crear esta página después)
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    // Verificar que el carrito no esté vacío
    if (carrito.length === 0) {
      setError('Tu carrito está vacío');
      return;
    }

    setProcesando(true);
    setError(null);

    try {
      // Preparar los datos del pedido
      const pedidoData = {
        productos: carrito.map((item) => ({
          productoId: item.id,
          nombre: item.nombre,
          precio: item.precio,
          cantidad: item.cantidad,
          imagen: item.imagen,
        })),
        total: totalCarrito,
        fecha: new Date().toISOString(),
      };

      // Enviar pedido al backend
      const response = await fetch('http://localhost:3001/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pedidoData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al procesar el pedido');
      }

      const data = await response.json();

      // Vaciar el carrito después de un pedido exitoso
      vaciarCarrito();

      // Mostrar mensaje de éxito y redirigir
      alert(`¡Pedido realizado con éxito! Número de pedido: ${data.pedido.numeroPedido || data.pedido._id}`);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Error al procesar el pedido. Por favor, intenta nuevamente.');
      console.error('Error al finalizar compra:', err);
    } finally {
      setProcesando(false);
    }
  };

  return (
    <>
      <Header />
      <main className="carrito-container">
        <h1 className="titulo-carrito">Mi Carrito de Compras</h1>

        {error && (
          <div style={{
            background: '#ff4444',
            color: 'white',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {carrito.length === 0 ? (
          <div className="carrito-vacio">
            <i className="fa-solid fa-shopping-cart carrito-vacio-icon"></i>
            <h2>Tu carrito está vacío</h2>
            <p>¡Descubre nuestros productos y comienza a agregar tus favoritos!</p>
            <Link to="/catalogo">
              <button className="btn-seguir-comprando">
                Explorar Catálogo
              </button>
            </Link>
          </div>
        ) : (
          <div className="carrito-contenido">
            <div className="carrito-items">
              <div className="carrito-header">
                <span className="header-producto">Producto</span>
                <span className="header-precio">Precio</span>
                <span className="header-cantidad">Cantidad</span>
                <span className="header-subtotal">Subtotal</span>
                <span className="header-acciones"></span>
              </div>

              {carrito.map((item) => (
                <div key={item.id} className="carrito-item">
                  <div className="item-producto">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      onError={(e) =>
                        (e.target.src =
                          "https://jazminshaiel.github.io/hermanos_jota/img/placeholder.png")
                      }
                    />
                    <div className="item-info">
                      <h3>{item.nombre}</h3>
                      <p className="item-categoria">{item.categoria}</p>
                    </div>
                  </div>

                  <div className="item-precio">
                    {formatearPrecio(item.precio)}
                  </div>

                  <div className="item-cantidad">
                    <button
                      className="btn-cantidad"
                      onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                      disabled={item.cantidad <= 1}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <span className="cantidad-valor">{item.cantidad}</span>
                    <button
                      className="btn-cantidad"
                      onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>

                  <div className="item-subtotal">
                    {formatearPrecio(item.precio * item.cantidad)}
                  </div>

                  <div className="item-acciones">
                    <button
                      className="btn-eliminar"
                      onClick={() => eliminarDelCarrito(item.id)}
                      title="Eliminar producto"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="carrito-resumen">
              <h2>Resumen del Pedido</h2>
              <div className="resumen-detalle">
                <div className="resumen-linea">
                  <span>Productos ({cantidadTotal} {cantidadTotal === 1 ? 'item' : 'items'})</span>
                  <span>{formatearPrecio(totalCarrito)}</span>
                </div>
                <div className="resumen-linea">
                  <span>Envío</span>
                  <span className="envio-gratis">GRATIS</span>
                </div>
                <div className="resumen-total">
                  <span>Total</span>
                  <span className="total-precio">{formatearPrecio(totalCarrito)}</span>
                </div>
              </div>

              <button
                className="btn-finalizar-compra"
                onClick={handleFinalizarCompra}
                disabled={procesando || !estaAutenticado}
                title={!estaAutenticado ? 'Debes iniciar sesión para finalizar la compra' : ''}
              >
                {procesando ? 'Procesando...' : 'Finalizar Compra'}
              </button>

              {!estaAutenticado && (
                <p style={{
                  fontSize: '14px',
                  color: '#ff4444',
                  textAlign: 'center',
                  marginTop: '10px'
                }}>
                  * Debes iniciar sesión para finalizar la compra
                </p>
              )}

              <Link to="/catalogo">
                <button className="btn-seguir-comprando-secundario">
                  Seguir Comprando
                </button>
              </Link>

              <button
                className="btn-vaciar-carrito"
                onClick={vaciarCarrito}
              >
                <i className="fa-solid fa-trash"></i> Vaciar Carrito
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Cart;
