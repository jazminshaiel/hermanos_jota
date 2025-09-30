document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/productos");
    if (!response.ok) throw new Error("Error al obtener productos");
    const productos = await response.json();

    const destacados = [...productos].sort(() => 0.5 - Math.random()).slice(0, 4);

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
  } catch (error) {
    console.error("Error cargando destacados:", error);
  }
});
