import React from 'react';
import "../styles/estilos-globales.css"; 
import "../styles/estilos-contacto.css"; 

import Header from "../components/Header"; 
import Footer from "../components/Footer"; 

function Contacto({ cantidadCarrito }) {
    return (
        <>
            <Header cantidadCarrito={cantidadCarrito} />
            <main className="container"> 
                <h1>Página de Contacto</h1>
                
                <div className="contenedor-contacto">
                    <p>¡Hola! Podemos ayudarte. Rellená el formulario o visitanos.</p>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Contacto;