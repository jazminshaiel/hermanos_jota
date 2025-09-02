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

let productosFiltrados = [...productos ]; 
/* Creamos copia del array original '...' apunta a otro array independiente. */

function crearCartaProducto(producto) {
  return `
        <div class="carta-producto">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h2> ${producto.nombre} </h2>
            <p> ${producto.descripcion} </p>
            <span class="precio-producto"> ${producto.precio} </span>
        </div>
    `;
}

function cargarProductos() {
  mostrarProductos(productos);
}

function mostrarProductos(productosAMostrar) {
  const contenedor = document.getElementById("contenedorProductos");
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

function buscarProductos() {
  const termino = document.getElementById("busquedaInput").value.toLowerCase().trim();
  aplicarBusqueda(termino);
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
