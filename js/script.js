const productListElement = document.getElementById("product-list");

fetch("https://fakestoreapi.com/products")
  .then(response => response.json())
  .then(data => {
    const productsToShow = data.slice(0, 4); // Obtener solo los primeros 4 productos

    productsToShow.forEach(product => {
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
  .catch(error => {
    console.log("Error fetching products:", error);
  });
