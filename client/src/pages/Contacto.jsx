import React, { useState, useEffect } from "react";
import "../styles/estilos-globales.css"; 
import "../styles/estilos-contacto.css";
import "../styles/Footer.css";

import Header from "../components/Header"; 
import Footer from "../components/Footer"; 

function Contacto() {
  
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    comentario: "" 
  });

  
  const [errors, setErrors] = useState({});
  
  
  const [exito, setExito] = useState(false);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validación especial para el campo comentario
    if (name === 'comentario') {
      // Permitir solo letras, números, espacios, signos de pregunta y exclamación
      // Y limitar a 200 caracteres
      // Primero filtrar caracteres no permitidos, luego limitar a 200
      const sanitizedValue = value
        .replace(/[^a-zA-Z0-9\s¿?¡!]/g, '') // Remover caracteres no permitidos
        .slice(0, 200); // Limitar a 200 caracteres
      
      setFormData({
        ...formData,
        [name]: sanitizedValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

 
  useEffect(() => {
    if (exito) {
      const timer = setTimeout(() => {
        setExito(false);
      }, 4000);
     
      return () => clearTimeout(timer);
    }
  }, [exito]);


  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    setExito(false); 

    const validationErrors = {};
    const { nombre, email, comentario } = formData;

    
    if (nombre.trim().length < 2) {
      validationErrors.nombre = "El nombre debe tener al menos 2 caracteres.";
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      validationErrors.email = "El correo electrónico no es válido.";
    }

    
    if (comentario.trim().length < 10) {
      validationErrors.comentario = "El comentario debe tener al menos 10 caracteres.";
    }
    
    if (comentario.length > 200) {
      validationErrors.comentario = "El comentario no puede exceder 200 caracteres.";
    }

    
    setErrors(validationErrors);

    
    if (Object.keys(validationErrors).length === 0) {
      setExito(true); 

     
      setFormData({ nombre: "", email: "", comentario: "" });
      setErrors({});
    }
  };

  return (
    <>
      <Header />
      <main>
        <div id="mini_banner">
          <div id="palabras-banner">
            <h1>Contacto</h1>
            <h4>estamos para ayudarte</h4>
          </div>
        </div>

        <div className="formulario-contenedor">
          <form id="contactoForm" className="contacto-form" onSubmit={handleSubmit} noValidate>
            
            {/* Mensajes de error y éxito */}
            <div id="mensajes">
              {Object.keys(errors).length > 0 && (
                <div className="error-message">
                  <span>Por favor, corrige los siguientes errores:</span>
                  <ul className="lista-errores">
                    {Object.values(errors).map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              {exito && (
                <div className="success-message">
                  ¡Mensaje enviado con éxito! Te responderemos pronto.
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="Nombre">Nombre Completo</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-user input-icon"></i>
                <input
                  className={`campo ${errors.nombre ? 'error' : ''}`}
                  type="text"
                  id="Nombre"
                  name="nombre"
                  placeholder="Ingresa tu nombre completo"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="Email">Correo Electrónico</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-envelope input-icon"></i>
                <input
                  className={`campo ${errors.email ? 'error' : ''}`}
                  type="email"
                  id="Email"
                  name="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="Comentario">Mensaje</label>
              <div className="textarea-wrapper">
                <i className="fa-solid fa-comment textarea-icon"></i>
                <textarea
                  className={`campo ${errors.comentario ? 'error' : ''}`}
                  id="Comentario"
                  name="comentario"
                  placeholder="Escribe tu mensaje aquí..."
                  rows="8"
                  maxLength={200}
                  value={formData.comentario}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="field-hint-wrapper">
                <small className="field-hint">
                  Mínimo 10 caracteres. 
                </small>
                <small className={`character-count ${formData.comentario.length >= 200 ? 'character-count-warning' : ''}`}>
                  {formData.comentario.length}/200 caracteres
                </small>
              </div>
            </div>

            <button id="Enviar" type="submit" className="contacto-button">
              <i className="fa-solid fa-paper-plane" style={{ marginRight: '8px' }}></i>
              Enviar Mensaje
            </button>

          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Contacto;