import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { DetailedProduct } from '../components/DetailedProduct';
import "../styles/estilos-globales.css"
import "../styles/estilos-producto.css"

function ProductDetail() {
  return (
    <>
      <Header />
      <div>
        <DetailedProduct productImg={"https://jazminshaiel.github.io/hermanos_jota/client/public/img/silladeTrabajoBelgrano.png"} productName={"Silla de Trabajo Belgrano"} productDescription={"Silla de oficina ergonómica con respaldo regulable y base giratoria. Tapizado en material transpirable con soporte lumbar ajustable."} productPrice={10000000}></DetailedProduct>
      </div>
      <Footer />
    </>
  );
}
export default ProductDetail;
