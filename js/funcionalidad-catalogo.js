const productos = [ //contenedor de productos.
    {
        nombre: "Aparador Uspallata",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "../Kit de imágenes/Aparador Uspallata.png"
    },
    {
        nombre: "Biblioteca Recoleta",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "../Kit de imágenes/Biblioteca Recoleta.png"
    },
    {
        nombre: "Butaca Mendoza",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "../Kit de imágenes/Butaca Mendoza.png"
    },
    {
        nombre: "Sillon Copacabana",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "../Kit de imágenes/Sillón Copacabana.png"
    },
    {
        nombre: "Mesa de Centro Araucaria",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "../Kit de imágenes/Mesa de Centro Araucaria.png"
    },
    {
        nombre: "Mesa de Noche Aconcagua",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "../Kit de imágenes/Mesa de Noche Aconcagua.png"
    },
    {
        nombre: "Cama Neuquén",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "../Kit de imágenes/Cama Neuquén.png"
    },
    {
        nombre: "Sofá Patagonia",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "../Kit de imágenes/Sofá Patagonia.png"
    },
    {
        nombre: "Mesa Comedor Pampa",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "../Kit de imágenes/Mesa Comedor Pampa.png"
    },
    {
        nombre: "Sillas Córdoba",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "../Kit de imágenes/Sillas Córdoba.png"
    },
    {
        nombre: "Escritorio Costa",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "../Kit de imágenes/Escritorio Costa.png"
    },
    {
        nombre: "Silla de Trabajo Belgrano",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "../Kit de imágenes/Silla de Trabajo Belgrano.png"
    }
];

const modal = document.getElementById("contenedorModal");
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
    const contenedor = document.getElementById("contenedorProductos");
    let html = '';
    productos.forEach(producto => { //genera html para c/producto.
        html += crearCartaProducto(producto);
    });
    contenedor.innerHTML = html; //inserta el html.
}