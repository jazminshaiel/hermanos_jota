import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/estilos-globales.css"; 
import "../styles/estilos-home.css"; 

import Header from "../components/Header"; 
import Footer from "../components/Footer"; 

function Home() {
    return (
        <>
            <Header />
            <main>
                <section className="banner">
                    <div className="contenido">
                        <h1>Muebles con historia y alma</h1>
                        <h2>
                            Diseñamos y fabricamos piezas con conciencia, uniendo la herencia
                            del pasado con la mirada sustentable del futuro.
                        </h2>
                        <Link to="/catalogo">
                            <button>EXPLORAR CATÁLOGO</button>
                        </Link>
                    </div>
                    <div className="imagen">
                        <img
                            src="https://jazminshaiel.github.io/hermanos_jota/img/banner.png"
                            alt="Mesa de centro y butaca"
                        />
                    </div>
                </section>
                {/* Otras secciones de la Home */}
            </main>
            <Footer />
        </>
    );
}

export default Home;