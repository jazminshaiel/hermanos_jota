const productos = [
  //contenedor de productos.
  {
    nombre: "Aparador Uspallata",
    descripcion:
      "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
    precio: "$XX.XXX",
    imagen: "../Kit de imágenes/Aparador Uspallata.png",
  },
  {
    nombre: "Biblioteca Recoleta",
    descripcion:
      "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
    precio: "$XX.XXX",
    imagen: "../Kit de imágenes/Biblioteca Recoleta.png",
  },
  {
    nombre: "Butaca Mendoza",
    descripcion:
      "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
    precio: "$XX.XXX",
    imagen: "../Kit de imágenes/Butaca Mendoza.png",
  },
  {
    nombre: "Sillon Copacabana",
    descripcion:
      "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
    precio: "$XX.XXX",
    imagen: "../Kit de imágenes/Sillón Copacabana.png",
  },
  {
    nombre: "Mesa de Centro Araucaria",
    descripcion:
      "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
    precio: "$XX.XXX",
    imagen: "../Kit de imágenes/Mesa de Centro Araucaria.png",
  },
  {
    nombre: "Mesa de Noche Aconcagua",
    descripcion:
      "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
    precio: "$XX.XXX",
    imagen: "../Kit de imágenes/Mesa de Noche Aconcagua.png",
  },
  {
    nombre: "Cama Neuquén",
    descripcion:
      "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
    precio: "$XX.XXX",
    imagen: "../Kit de imágenes/Cama Neuquén.png",
  },
  {
    nombre: "Sofá Patagonia",
    descripcion:
      "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
    precio: "$XX.XXX",
    imagen: "../Kit de imágenes/Sofá Patagonia.png",
  },
  {
    nombre: "Mesa Comedor Pampa",
    descripcion:
      "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
    precio: "$XX.XXX",
    imagen: "../Kit de imágenes/Mesa Comedor Pampa.png",
  },
  {
    nombre: "Sillas Córdoba",
    descripcion:
      "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
    precio: "$XX.XXX",
    imagen: "../Kit de imágenes/Sillas Córdoba.png",
  },
  {
    nombre: "Escritorio Costa",
    descripcion:
      "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
    precio: "$XX.XXX",
    imagen: "../Kit de imágenes/Escritorio Costa.png",
  },
  {
    nombre: "Silla de Trabajo Belgrano",
    descripcion:
      "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
    precio: "$XX.XXX",
    imagen: "../Kit de imágenes/Silla de Trabajo Belgrano.png",
  },
];

let productosFiltrados = [...productos];
/* Creamos copia del array original '...' apunta a otro array independiente. */

function crearCartaProducto(producto) {
  return `
    <a href="#" class="carta-producto">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="info-producto">
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcion}</p>
            <span class="precio-producto">${producto.precio}</span>
        </div>
    </a>
  `;
}

function mostrarProductos(productosAMostrar) {
  const contenedor = document.getElementById("contenedorProductos");
  // Limpiamos contenido anterior
  contenedor.innerHTML = "";
  if (productosAMostrar.length === 0) {
    contenedor.innerHTML =
      '<div class="no-results">No se encontraron productos</div>';
    return;
  }

  let html = "";
  productosAMostrar.forEach((producto) => {
    html += crearCartaProducto(producto);
  });
  contenedor.innerHTML = html;
}

// Función para simular la carga asíncrona de datos con una Promesa
function cargarProductosAsync() {
  const contenedor = document.getElementById("contenedorProductos");
  contenedor.innerHTML = '<div class="cargando">Cargando productos...</div>'; // Mensaje de carga

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productos);
    }, 1500); // 1.5s delay
  });
}

function aplicarBusqueda(termino) {
  if (termino) {
    productosFiltrados = productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(termino) ||
        producto.descripcion.toLowerCase().includes(termino)
    );
  } else {
    productosFiltrados = productos;
  }

  mostrarProductos(productosFiltrados);
}

//Eventos de "escucha"
document.addEventListener("DOMContentLoaded", () => {
  cargarProductosAsync().then((data) => {
    mostrarProductos(data);
  });
});

const busquedaInput = document.getElementById("busquedaInput");
const busquedaButton = document.querySelector(".btn-busqueda");

busquedaButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevención del comportamiento por defecto
  const termino = busquedaInput.value.toLowerCase().trim();
  aplicarBusqueda(termino);
});

busquedaInput.addEventListener("keyup", (event) => {
  // Busqueda en tiempo real con debounce
  clearTimeout(busquedaInput.searchTimeout);
  busquedaInput.searchTimeout = setTimeout(() => {
    aplicarBusqueda(busquedaInput.value.toLowerCase().trim());
  }, 300);
});