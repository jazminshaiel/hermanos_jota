import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/estilos-globales.css";
import "../styles/estilos-carrito.css";

function Cart({ carrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito, cantidadCarrito }) {
  
  // Calcular el total del carrito
  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(precio);
  };

  return (
    <>
      <Header cantidadCarrito={cantidadCarrito} />
      <main className="carrito-container">
        <h1 className="titulo-carrito">Mi Carrito de Compras</h1>

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
                  <span>Productos ({cantidadCarrito} {cantidadCarrito === 1 ? 'item' : 'items'})</span>
                  <span>{formatearPrecio(calcularTotal())}</span>
                </div>
                <div className="resumen-linea">
                  <span>Envío</span>
                  <span className="envio-gratis">GRATIS</span>
                </div>
                <div className="resumen-total">
                  <span>Total</span>
                  <span className="total-precio">{formatearPrecio(calcularTotal())}</span>
                </div>
              </div>

              <button className="btn-finalizar-compra">
                Finalizar Compra
              </button>

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
