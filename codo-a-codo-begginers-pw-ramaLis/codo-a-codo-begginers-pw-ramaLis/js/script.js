const productListElement = document.getElementById("product-list");
const cartItemsElement = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");

let cart = [];

fetch("https://fakestoreapi.com/products")
  .then(response => response.json())
  .then(data => {
    displayProducts(data);
  })
  .catch(error => {
    console.log("Error fetching products:", error);
  });

function displayProducts(products) {
  products.forEach(product => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    const imageElement = document.createElement("img");
    imageElement.src = product.image;

    const titleElement = document.createElement("h3");
    titleElement.textContent = product.title;

    const priceElement = document.createElement("p");
    priceElement.textContent = `Precio: $${product.price}`;

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "agregar al carrito";
    addToCartButton.addEventListener("click", () => {
      addToCart(product);
    });

    productElement.appendChild(imageElement);
    productElement.appendChild(titleElement);
    productElement.appendChild(priceElement);
    productElement.appendChild(addToCartButton);

    productListElement.appendChild(productElement);
  });
}

function addToCart(product) {
  const existingCartItem = cart.find(item => item.id === product.id);

  if (existingCartItem) {
    existingCartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

function updateCart() {
  cartItemsElement.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    const title = document.createElement("span");
    const quantity = document.createElement("span");
    const price = document.createElement("span");
    const removeButton = document.createElement("button");

    title.textContent = item.title;
    quantity.textContent = `Quantity: ${item.quantity}`;
    price.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
    removeButton.textContent = "Remover";
    removeButton.addEventListener("click", () => {
      removeFromCart(item.id);
    });

    li.appendChild(title);
    li.appendChild(quantity);
    li.appendChild(price);
    li.appendChild(removeButton);

    cartItemsElement.appendChild(li);

    total += item.price * item.quantity;
  });

  cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

checkoutButton.addEventListener("click", () => {
  alert("¡Gracias por tu compra!");
  cart = [];
  updateCart();
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
