document.addEventListener("DOMContentLoaded", function() {
    const cart = [];
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElem = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout");
    const cartSection = document.getElementById("cart");

    // Kosárba rakás
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function() {
            const product = this.closest(".shop-item");
            const id = product.getAttribute("data-id");
            const name = product.getAttribute("data-name");
            const price = parseFloat(product.getAttribute("data-price"));
            
            // Kosárhoz adás
            cart.push({ id, name, price });

            // Kosár frissítése
            updateCart();
        });
    });

    // Kosár frissítése
    function updateCart() {
        // Kosár üresítése és újratöltése
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.name} - ${item.price} USD`;
            cartItemsContainer.appendChild(li);
            total += item.price;
        });

        // Összesített ár
        totalPriceElem.textContent = total.toFixed(2);

        // Kosár megjelenítése
        cartSection.style.display = cart.length > 0 ? "block" : "none";
    }

    // Fizetés gomb
    checkoutButton.addEventListener("click", function() {
        if (cart.length > 0) {
            alert(`Fizetés ${totalPriceElem.textContent} USD összegben`);
            // Kosár ürítése a fizetés után
            cart.length = 0;
            updateCart();
        } else {
            alert("A kosár üres!");
        }
    });

    // PayPal gomb beágyazása
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: totalPriceElem.textContent // Kosár összeg
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Fizetés sikeres! Köszönjük, ' + details.payer.name.given_name);
                cart.length = 0; // Kosár ürítése
                updateCart();
            });
        }
    }).render('#paypal-button');  // Gomb megjelenítése
});

function openTab(tabName) {
    // Minden tab content elrejtése
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
      content.style.display = 'none';
    });
  
    // Az aktuális tab megjelenítése
    const activeTab = document.getElementById(tabName);
    activeTab.style.display = 'block';
  }
  
  // Alapértelmezett tab: Főoldal
  document.addEventListener('DOMContentLoaded', function () {
    openTab('home');
  });
  
  // Elérhetőség szekció megnyitása/bekapcsolása
  function toggleContact() {
    const contactSection = document.getElementById('contact');
    
    // Ha a contact szekció már látszik, akkor elrejtjük, ha nem, akkor megjelenítjük
    if (contactSection.style.display === 'block') {
      contactSection.style.display = 'none';
    } else {
      contactSection.style.display = 'block';
    }
  }
  
