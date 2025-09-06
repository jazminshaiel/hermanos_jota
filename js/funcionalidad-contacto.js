document.getElementById("contactoForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let errores = [];

  let nombre = document.getElementById("Nombre").value.trim();
  let email = document.getElementById("Email").value.trim();
  let comentario = document.getElementById("Comentario").value.trim();
  
  document.querySelectorAll(".campo").forEach(campo => {
    campo.style.border = "1px solid #ccc";
  });

  if (nombre.length < 2) {
    errores.push("El nombre debe tener al menos 2 caracteres.");
    document.getElementById("Nombre").style.border = "2px solid red";
  } else {
    document.getElementById("Nombre").style.border = "2px solid green";
  }

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errores.push("El correo electrónico no es válido.");
    document.getElementById("Email").style.border = "2px solid red";
  } else {
    document.getElementById("Email").style.border = "2px solid green";
  }

  if (comentario.length < 10) {
    errores.push("El comentario debe tener al menos 10 caracteres.");
    document.getElementById("Comentario").style.border = "2px solid red";
  } else {
    document.getElementById("Comentario").style.border = "2px solid green";
  }

  let contenedorMensajes = document.getElementById("mensajes");
  if (errores.length > 0) {
    contenedorMensajes.innerHTML = `
      <ul style="color: red; text-align:left;">
        ${errores.map(err => `<li>${err}</li>`).join("")}
      </ul>
    `;
  } else {
    contenedorMensajes.innerHTML = `
      <p style="color: green; font-weight: bold; margin-top: 1rem;">
        ✅ ¡Formulario enviado con éxito!
      </p>
    `;
    this.reset();

    document.querySelectorAll(".campo").forEach(campo => {
      campo.style.border = "1px solid #ccc";
    });

    setTimeout(() => {
      contenedorMensajes.innerHTML = "";
    }, 4000);
  }
});
//se manipulo el dom//
