import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/estilos-globales.css";
import "../styles/Home.css";
import "../styles/Footer.css";

function Home({ carritoItems = 0, añadirAlCarrito }) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3001/api/productos');
            
            if (!response.ok) {
                throw new Error('Error al cargar productos');
            }
            
            const data = await response.json();
            const randomProducts = data.sort(() => 0.5 - Math.random()).slice(0, 4);
            
            setProductos(randomProducts);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header carritoItems={carritoItems} />
            
            <main>
                <section className="hero">
                    <div className="hero-content">
                        <h1>Hermanos Jota</h1>
                        <h2>Muebles que crean historias</h2>
                        <p>Piezas únicas que combinan artesanía y diseño moderno.</p>
                        <Link to="#about">Conocer más</Link>
                    </div>
                    <div className="hero-image">
                        <img src="/img/aparadorUspallata.png" alt="Aparador Uspallata" />
                    </div>
                </section>

                <section className="destacados">
                    <h2>Productos destacados</h2>
                    
                    {loading && <div className="mensaje"><p>Cargando productos...</p></div>}
                    
                    {error && (
                        <div className="error">
                            <p>⚠️ {error}</p>
                            <button onClick={fetchProductos}>Reintentar</button>
                        </div>
                    )}
                    
                    {!loading && !error && (
                        <div className="grid-productos">
                            {productos.map((p) => (
                                <div key={p.id} className="card">
                                    <Link to={`/producto/${p.id}`} className="card-link">
                                        <div className="card-img">
                                            <img 
                                                src={p.imagen} 
                                                alt={p.nombre}
                                                onError={(e) => e.target.src = '/img/logo.svg'}
                                            />
                                        </div>
                                        <h3>{p.nombre}</h3>
                                        <p>{p.descripcion}</p>
                                        <span className="precio">{p.precio}</span>
                                    </Link>
                                    <button 
                                        className="boton-carrito" 
                                        onClick={() => {
                                            if (añadirAlCarrito) {
                                                añadirAlCarrito(p);
                                            }
                                        }}
                                    >
                                        Añadir al carrito
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="nosotros" id="about">
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
