const productos = [ //contenedor de productos.
    {
        nombre: "Aparador Uspallata",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "..\Kit de imágenes\Aparador Uspallata.png"
    },
    {
        nombre: "Aparador Uspallata",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "..\Kit de imágenes\Aparador Uspallata.png"
    },
    {
        nombre: "Aparador Uspallata",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "..\Kit de imágenes\Aparador Uspallata.png"
    },
    {
        nombre: "Aparador Uspallata",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "..\Kit de imágenes\Aparador Uspallata.png"
    },
    {
        nombre: "Aparador Uspallata",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "..\Kit de imágenes\Aparador Uspallata.png"
    },
    {
        nombre: "Aparador Uspallata",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "..\Kit de imágenes\Aparador Uspallata.png"
    },
    {
        nombre: "Aparador Uspallata",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "..\Kit de imágenes\Aparador Uspallata.png"
    },
    {
        nombre: "Aparador Uspallata",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "..\Kit de imágenes\Aparador Uspallata.png"
    },
    {
        nombre: "Aparador Uspallata",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "..\Kit de imágenes\Aparador Uspallata.png"
    },
    {
        nombre: "Aparador Uspallata",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "..\Kit de imágenes\Aparador Uspallata.png"
    },
    {
        nombre: "Aparador Uspallata",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "..\Kit de imágenes\Aparador Uspallata.png"
    },
    {
        nombre: "Aparador Uspallata",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: "$XX.XXX",
        imagen: "..\Kit de imágenes\Aparador Uspallata.png"
    }
];

function crearCartaProducto(producto) {
    return `
        <div class="carta-producto">
            <img src="${producto.imagenn}" alt="${producto.nombre}">
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