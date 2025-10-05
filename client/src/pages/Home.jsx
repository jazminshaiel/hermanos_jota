import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/estilos-globales.css"; 
import "../styles/estilos-home.css"; 

import Header from "../components/Header"; 
import Footer from "../components/Footer"; 

function Home() {
    const [productosDestacados, setProductosDestacados] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        cargarProductosDestacados();
    }, []);

    const cargarProductosDestacados = async () => {
        try {
            setCargando(true);
            setError(null);
            
            const response = await fetch('/api/productos');
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: Error al cargar productos`);
            }
            
            const productos = await response.json();
            
            // Seleccionar 4 productos aleatorios para destacados
            const destacados = [...productos]
                .sort(() => 0.5 - Math.random())
                .slice(0, 4);
            
            setProductosDestacados(destacados);
        } catch (err) {
            console.error('Error al cargar productos destacados:', err);
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

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
                <section className="destacados">
                    <div>
                        <h2>Productos destacados</h2>

                        {/* Estado de carga */}
                        {cargando && (
                            <div className="cargando">
                                <p>Cargando productos destacados...</p>
                            </div>
                        )}

                        {/* Estado de error */}
                        {error && (
                            <div className="error-carga">
                                <p>⚠️ Error al cargar productos: {error}</p>
                                <button onClick={cargarProductosDestacados}>
                                    Reintentar
                                </button>
                            </div>
                        )}

                        {!cargando && !error && (
                            <div className="tarjetas">
                                {productosDestacados.map((producto) => (
                                    <div key={producto.id} className="tarjeta">
                                        <Link to={`/producto/${producto.id}`} className="tarjeta-link">
                                            <div className="imagen">
                                                <img 
                                                    src={producto.imagen} 
                                                    alt={producto.nombre}
                                                    onError={(e) => {
                                                        e.target.src = '/img/logo.svg';
                                                    }}
                                                />
                                            </div>
                                            <div className="texto">
                                                <h3>{producto.nombre}</h3>
                                                <p>{producto.descripcion}</p>
                                                <span className="precio">{producto.precio}</span>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
                <section id="nosotros">
                    <h2>Sobre Nosotros</h2>
                    <p>
                        Hermanos Jota es el redescubrimiento de un arte olvidado: crear
                        muebles que no solo sirven una función, sino que alimentan el alma.
                        Existimos en la intersección entre herencia e innovación, donde la
                        calidez del optimismo de los años 60 se encuentra con la conciencia
                        de la sustentabilidad del 2025. Cada pieza cuenta una historia de
                        artesanía que honra el pasado mientras abraza el futuro.
                    </p>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Home;