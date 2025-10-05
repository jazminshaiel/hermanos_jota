import React, { useState } from "react";
import "../styles/estilos-globales.css"; 
import "../styles/estilos-contacto.css"; 

import Header from "../components/Header"; 
import Footer from "../components/Footer"; 

function Contacto() {
  
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: ""
  });

  
  const [exito, setExito] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    setExito(true);

   
    setFormData({ nombre: "", email: "", mensaje: "" });
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
    <form id="contactoForm" onSubmit={handleSubmit}>
      <div id="mensajes"></div>

      <div>
        <label htmlFor="Nombre">Nombre<br /></label>
        <input
          className="campo"
          type="text"
          id="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="Email">Correo<br /></label>
        <input
          className="campo"
          type="email"
          id="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="Comentario">Comentario<br /></label>
        <textarea
          className="campo"
          id="Comentario"
          name="mensaje"
          rows="10"
          value={formData.mensaje}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="boton">
        <button id="Enviar" type="submit">enviar</button>
      </div>

      <div id="mensajes">
        {exito && <p className="mensaje-exito">✅ ¡Mensaje enviado con éxito!</p>}
      </div>
    </form>
  </div>
</main>
      <Footer />
    </>
  );
}

export default Contacto;