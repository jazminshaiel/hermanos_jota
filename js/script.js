document.addEventListener("DOMContentLoaded", () => {
  const destacados = [productos[0], productos[3], productos[7], productos[10]];

  const tarjetas = document.querySelectorAll(".tarjetas .tarjeta");

  destacados.forEach((producto, index) => {
    if (tarjetas[index]) {
      tarjetas[index].querySelector(".imagen").innerHTML =
        `<img src="${producto.imagen}" alt="${producto.nombre}">`;
      tarjetas[index].querySelector(".texto").innerHTML =
        `<h3>${producto.nombre}</h3>
         <p>${producto.descripcion}</p>`;
    }
  });
});