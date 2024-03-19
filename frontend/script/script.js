document.addEventListener("DOMContentLoaded", () => {


    const productContainer = document.getElementById("product-container");
    const loader = document.getElementById("loader");
    setTimeout(() => {
      loader.style.display = "none";
      productContainer.classList.remove("blur");
    }, 1000);

    fetch("https://cyan-dugong-cape.cyclic.app/data/get")
      .then(response => response.json())
      .then(data => renderProducts(data))
      .catch(error => console.error("Error fetching data:", error));

    function renderProducts(products) {
      products.forEach((product, index) => {

        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        const productImage = document.createElement("img");
        productImage.classList.add("product-image");
        productImage.src = product.image;

        const productName = document.createElement("div");
        productName.classList.add("product-name");
        productName.textContent = product.name;

        const productPrice = document.createElement("div");
        productPrice.classList.add("product-price");
        productPrice.textContent = "$" + product.price;

        const productButtons = document.createElement("div");
        productButtons.classList.add("product-buttons");

        const addToCartButton = document.createElement("button");
        addToCartButton.classList.add("btn", "btn-primary", "product-button");
        addToCartButton.textContent = "Add to Cart";
        // Add click event listener to the "Add to Cart" button
        addToCartButton.addEventListener("click", () => {
    let token = localStorage.getItem("token");
    if (token) {
        let cartItems = JSON.parse(localStorage.getItem("Favourites")) || [];
        
        // Check if the product is already in the cart based on its properties
        if (cartItems.some(item => item.name === product.name && item.price === product.price)) {
        } else {
            // If the product is not in the cart, add it to the cart
            cartItems.push({ ...product });
            localStorage.setItem("Favourites", JSON.stringify(cartItems));
            
            // Show the confirmation message
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        }
    } else {
        window.location.href = "./login.html";
    }
});

        const orderNowButton = document.createElement("button");
        orderNowButton.classList.add("btn", "btn-success", "product-button");
        orderNowButton.textContent = "Order Now";
        orderNowButton.addEventListener("click", () => {
          let tokendata = localStorage.getItem("token");
          if (tokendata) {
            Swal.fire(
                'Order placed',
                'Successful',
                'success'
              )
              setTimeout(() => {
                window.location.href = ("./index.html")
              }, 3000);
          } else {
            window.location.href = "./login.html";
          }
        });

        productButtons.appendChild(addToCartButton);
        productButtons.appendChild(orderNowButton);

        productCard.appendChild(productImage);
        productCard.appendChild(productName);
        productCard.appendChild(productPrice);
        productCard.appendChild(productButtons);

        productContainer.appendChild(productCard);
      });
    }


    function addToCart(selectedProduct) {
      // Save the selected product data to Local Storage
      localStorage.setItem("selected_product", JSON.stringify(selectedProduct));

      // Redirect to another page to show only the selected product
      window.location.href = "product_detail.html";
    }
    // });

    let inputsearch = document.querySelector("#search-input");
    inputsearch.addEventListener("input", () => {
      document.querySelector(".product-list").innerHTML = null;
      let search = document.querySelector("#search-input").value

      fetch(`https://cyan-dugong-cape.cyclic.app/data/alldata?name=${search}`)
        .then(response => response.json())
        .then(data => {
          renderProducts(data)
        })

        .catch(error => console.error("Error fetching data:", error));
    })

    let userslogo = document.querySelector("#user-icon")
    userslogo.addEventListener("click", () => {
      let tokendata = localStorage.getItem("token")

      if (tokendata) {
        window.location.href = "./cart.html"
      } else {
        window.location.href = "./login.html"
      }


    })
    let cartlogo = document.querySelector("#cart-icon")
    cartlogo.addEventListener("click", () => {
      let tokendata = localStorage.getItem("token")

      if (tokendata) {
        window.location.href = "./cart.html"
      } else {
        window.location.href = "./login.html"
      }

    })
    let logo = document.querySelector("#logo-image");
    logo.addEventListener("click", () => {
      window.location.href = "./index.html"
    })
    let tokendata = localStorage.getItem("token");
    let userIcon = document.querySelector("#user-icon");
    let userLogout = document.querySelector("#user-logout");
    if (tokendata) {
      userIcon.style.display = "none";
      userLogout.style.display = "block";
    } else {
      userIcon.style.display = "block";
      userLogout.style.display = "none";
    }
    userLogout.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "./index.html";
    });
  })
