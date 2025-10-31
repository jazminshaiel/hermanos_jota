import React, { useState, useEffect } from "react";
import "../styles/estilos-globales.css"; 
import "../styles/estilos-contacto.css";
import "../styles/Footer.css";

import Header from "../components/Header"; 
import Footer from "../components/Footer"; 

function Contacto({ carritoItems = 0 }) {
  
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    comentario: "" 
  });

  
  const [errors, setErrors] = useState({});
  
  
  const [exito, setExito] = useState(false);

  
  const [submitted, setSubmitted] = useState(false);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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
    setSubmitted(true); 
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

    
    setErrors(validationErrors);

    
    if (Object.keys(validationErrors).length === 0) {
      setExito(true); 

     
      setFormData({ nombre: "", email: "", comentario: "" });
      setErrors({});
      setSubmitted(false);
    }
  };

  return (
    <>
      <Header carritoItems={carritoItems} />
      <main>
        <div id="mini_banner">
          <div id="palabras-banner">
            <h1>Contacto</h1>
            <h4>estamos para ayudarte</h4>
          </div>
        </div>

        <div className="formulario-contenedor">
          <form id="contactoForm" onSubmit={handleSubmit} noValidate>
            
            
            <div id="mensajes">
              {Object.keys(errors).length > 0 && (
                <ul className="lista-errores">
                  {Object.values(errors).map((error, index) => <li key={index}>{error}</li>)}
                </ul>
              )}
              {exito && <p className="mensaje-exito">✅ ¡Mensaje enviado con éxito!</p>}
            </div>

            <div>
              <label htmlFor="Nombre">Nombre<br /></label>
              <input
                className={`campo ${submitted && (errors.nombre ? 'input-error' : 'input-success')}`}
                type="text"
                id="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="Email">Correo<br /></label>
              <input
                className={`campo ${submitted && (errors.email ? 'input-error' : 'input-success')}`}
                type="email"
                id="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="Comentario">Comentario<br /></label>
              <textarea
                className={`campo ${submitted && (errors.comentario ? 'input-error' : 'input-success')}`}
                id="Comentario"
                name="comentario" 
                rows="10"
                value={formData.comentario}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="boton">
              <button id="Enviar" type="submit">enviar</button>
            </div>

          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Contacto;