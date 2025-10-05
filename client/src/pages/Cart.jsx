import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/estilos-globales.css";
import "../styles/Footer.css";
import "../styles/estilos-carrito.css";

function Cart({ carrito = [], removerDelCarrito, actualizarCantidad, carritoItems = 0 }) {
  
  // Calcular el total del carrito
  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const total = calcularTotal();
  const precioFormateado = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(total);

  if (carrito.length === 0) {
    return (
      <>
        <Header carritoItems={carritoItems} />
        <main className="carrito-container">
          <div className="carrito-vacio">
            <div className="carrito-vacio-content">
              <i className="fa-solid fa-cart-shopping"></i>
              <h3>Tu carrito está vacío</h3>
              <p>Agrega algunos productos para comenzar tu compra</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header carritoItems={carritoItems} />
      <main className="carrito-container">
        <h1>Mi Carrito</h1>
        
        <div className="carrito-content">
          <div className="carrito-items">
            {carrito.map((item) => (
              <div key={item.id} className="carrito-item">
                <div className="item-imagen">
                  <img src={item.imagen} alt={item.nombre} />
                </div>
                
                <div className="item-info">
                  <h3>{item.nombre}</h3>
                  <p className="item-descripcion">{item.descripcion}</p>
                  <p className="item-precio">
                    {new Intl.NumberFormat("es-AR", {
                      style: "currency",
                      currency: "ARS",
                      minimumFractionDigits: 0,
                    }).format(item.precio)}
                  </p>
                </div>
                
                <div className="item-controles">
                  <div className="cantidad-controls">
                    <button 
                      className="btn-cantidad"
                      onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                    >
                      -
                    </button>
                    <span className="cantidad">{item.cantidad}</span>
                    <button 
                      className="btn-cantidad"
                      onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    className="btn-eliminar"
                    onClick={() => removerDelCarrito(item.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
                
                <div className="item-subtotal">
                  {new Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 0,
                  }).format(item.precio * item.cantidad)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="carrito-resumen">
            <h3>Resumen de Compra</h3>
            <div className="resumen-details">
              <div className="resumen-item">
                <span>Productos ({carritoItems}):</span>
                <span>{precioFormateado}</span>
              </div>
              <div className="resumen-item">
                <span>Envío:</span>
                <span>Gratis</span>
              </div>
              <hr />
              <div className="resumen-total">
                <span><strong>Total:</strong></span>
                <span><strong>{precioFormateado}</strong></span>
              </div>
            </div>
            
            <button className="btn-checkout">
              Proceder al Pago
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Cart;
