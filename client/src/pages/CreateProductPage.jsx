import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/estilos-globales.css";
import "../styles/Footer.css";

function CreateProductPage({ carritoItems = 0 }) {
    return (
        <>
            <Header carritoItems={carritoItems} />
            <main style={{ padding: '40px', textAlign: 'center', minHeight: '70vh' }}>
                <h1>Crear Nuevo Producto (Admin) 🛠️</h1>
                <p>Aquí se implementará el formulario para añadir nuevos productos a la base de datos.</p>
                <div style={{ marginTop: '20px', padding: '20px', border: '1px dashed #ccc', maxWidth: '600px', margin: '0 auto' }}>
                    {/* El formulario para el nuevo producto irá aquí */}
                    <p>Formulario de creación de producto...</p>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default CreateProductPage;