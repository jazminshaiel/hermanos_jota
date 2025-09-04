# E-Commerce Hermanos Jota
### Integrantes
 - Srdos Gorosito Silvana
 - Roman Ezequiel Zorrilla
 - Jazmín Shaiel Nieto
 - Moreno Iñaki
 - Torres Lell Pablo A.
 
### Funcionalidad

 - #### Catalogo de Productos
    - **Visualización en Grilla**: Todos los productos disponibles se presentan en una grilla dinámica de tarjetas, optimizada para mostrar la información de manera ordenada y atractiva en un solo lugar.
    - **Renderizado Dinámico**: La información de cada producto se carga desde un array de objetos en un archivo de JavaScript local (funcionalidad-catalogo.js). Esto evita que los datos estén "hardcodeados" en el HTML, facilitando su gestión y actualización. El catálogo se renderiza dinámicamente manipulando el DOM, garantizando que el HTML se mantenga limpio y semántico.
    - **Acceso a Detalle**: Cada tarjeta de producto actúa como un enlace a su página de detalle correspondiente, proporcionando una experiencia de usuario fluida y orientada al producto.

### Tecnologias
 - HTML:
    -  El proyecto utiliza etiquetas semánticas para una estructura de documento limpia y legible.
 - CSS:
    - El diseño es 100% responsivo, utilizando Flexbox para la maquetación principal, asegurando una visualización óptima en dispositivos móviles (enfoque "Mobile-First") y de escritorio. Todo el estilo se gestiona desde un archivo CSS externo (estilos-catalogo.css).
 - JavaScript
    - La interactividad, incluida la carga de datos y la funcionalidad de búsqueda, se maneja con JavaScript moderno. La carga de productos simula ser asíncrona mediante el uso de setTimeout y Promises, y todos los eventos de interacción se gestionan con addEventListener.


