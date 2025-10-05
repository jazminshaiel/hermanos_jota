export function DetailedProduct({productName,productImg,productPrice,productDescription}){
    return (
        <section className="main-producto">
            <aside className="producto-imagen">
                <img src={productImg} alt={productName}></img>
            </aside>
            <div className="product-info">
                <h1>{productName}</h1>
                <p className="precio">{productPrice}</p>
                <p className="descripcion">{productDescription}</p>
                <button className="boton-carrito">Añadir al carrito</button>
            </div>
        </section>
    )
}