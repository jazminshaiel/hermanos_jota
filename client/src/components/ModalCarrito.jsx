import React, { useEffect } from 'react';

const ModalCarrito = ({ isOpen, onClose, producto }) => {
  useEffect(() => {
    if (isOpen) {
      // Cerrar modal automáticamente después de 3 segundos
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const precioFormateado = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(producto?.precio || 0);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-carrito" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icon">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" 
                fill="#4CAF50"
              />
            </svg>
          </div>
          <h3>¡Producto añadido!</h3>
        </div>
        
        <div className="modal-content">
          <div className="producto-info-modal">
            <img 
              src={producto?.imagen} 
              alt={producto?.nombre}
              className="producto-imagen-modal"
              onError={(e) => e.target.src = '/img/logo.svg'}
            />
            <div className="producto-details-modal">
              <h4>{producto?.nombre}</h4>
              <p className="precio-modal">{precioFormateado}</p>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="btn-continuar" onClick={onClose}>
              Continuar comprando
            </button>
            <button className="btn-ver-carrito" onClick={() => {
              onClose();
              window.location.href = '/carrito';
            }}>
              Ver carrito
            </button>
          </div>
        </div>
        
        <button className="modal-close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path 
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" 
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ModalCarrito;
