document.addEventListener("DOMContentLoaded", () => {
  if (typeof productosData === "undefined" || !Array.isArray(productosData)) {
    console.error("No se encontró productosData");
    return;
  }

 const destacados = [...productosData].sort(() => 0.5 - Math.random()).slice(0, 4);

  const tarjetas = document.querySelectorAll(".tarjetas .tarjeta");

  destacados.forEach((producto, index) => {
    if (tarjetas[index]) {
      
      tarjetas[index].querySelector(".imagen").innerHTML =
        `<img src="${producto.imagen}" alt="${producto.nombre}">`;

      
      tarjetas[index].querySelector(".texto").innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
      `;
    }
  });
});
