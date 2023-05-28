const productListElement = document.getElementById("product-list");

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    const productsToShow = data.slice(0, 20); // Obtener 20 productos

    productsToShow.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");

      const titleElement = document.createElement("h2");
      titleElement.textContent = product.title;

      const priceElement = document.createElement("p");
      priceElement.textContent = `Price: $${product.price}`;

      const imageElement = document.createElement("img");
      imageElement.src = product.image;

      productElement.appendChild(titleElement);
      productElement.appendChild(priceElement);
      productElement.appendChild(imageElement);

      productListElement.appendChild(productElement);
    });
  })
  .catch((error) => {
    console.log("Error fetching products:", error);
  });

/* JS Lis */
const nombre = document.getElementById("myname");
const apellidos = document.getElementById("surname");
const correo = document.getElementById("email");
const celular = document.getElementById("mobile");
const contrasenia = document.getElementById("password");
const contrasenia2 = document.getElementById("repeatPassword");
const terminosYcondiciones = document.getElementById("confirmaEnvio");
const form = document.getElementById("form");
const message = document.getElementById("message");
const listInputs = document.querySelectorAll(".form-input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let condicion = validacionForm();
  if (condicion) {
    enviarFormulario();
  }
});

function validacionForm() {
  form.lastElementChild.innerHTML = "";
  let condicion = true;
  listInputs.forEach((element) => {
    element.lastElementChild.innerHTML = "";
  });

  if (nombre.value.length < 1 || nombre.value.trim() == "") {
    mostrarMensajeError("myname", "Nombre no válido*");
    condicion = false;
  }
  if (apellidos.value.length < 1 || apellidos.value.trim() == "") {
    mostrarMensajeError("surname", "Apellido no válido");
    condicion = false;
  }
  if (correo.value.length < 1 || correo.value.trim() == "") {
    mostrarMensajeError("email", "Correo no válido*");
    condicion = false;
  }

  if (
    celular.value.length != 10 ||
    celular.value.trim() == "" ||
    isNaN(celular.value)
  ) {
    mostrarMensajeError("mobile", "Celular no válido*");
    condicion = false;
  }

  if (message.value.length < 1 || message.value.trim() == "") {
    mostrarMensajeError("message", "Mensaje no válido*");
    condicion = false;
  }

  if (!terminosYcondiciones.checked) {
    mostrarMensajeError("confirmaEnvio", "Confirmá*");
    condicion = false;
  } else {
    mostrarMensajeError("confirmaEnvio", "");
  }
  return condicion;
}

function mostrarMensajeError(claseInput, mensaje) {
  let elemento = document.querySelector(`.${claseInput}`);
  elemento.lastElementChild.innerHTML = mensaje;
}

function enviarFormulario() {
  form.reset();
  form.lastElementChild.innerHTML = "Listo !!";
}
