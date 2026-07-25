// ---------------- CART CORE FUNCTIONS ----------------

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateTopCount();
}

function updateTopCount() {
  const globalCountEls = document.querySelectorAll("#cart-count");
  const total = getCart().reduce((s, i) => s + Number(i.qty), 0);
  globalCountEls.forEach((e) => (e.textContent = total));
}

// ---------------- RENDER CART ITEMS ----------------

function renderCart() {
  const container = document.getElementById("cart-items");
  const cart = getCart();

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<p>Your cart is empty.</p>`;
    document.getElementById("subtotal").innerText = "$0.00";
    return;
  }

  let subtotal = 0;

  cart.forEach((item, idx) => {
    let lineTotal = item.price * item.qty;
    subtotal += lineTotal;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
        <!-- PRODUCT -->
        <div class="item-info">
          <img src="${item.img}" alt="">
          <div>
            <strong>${item.title}</strong>
          </div>
        </div>

        <!-- PRICE -->
        <div>
          $${item.price.toFixed(2)}
        </div>

        <!-- QTY -->
        <div>
          <input type="number" min="1" value="${item.qty}" class="qty-input" data-idx="${idx}">
          <button class="remove-btn" data-idx="${idx}">✕</button>
        </div>

        <!-- SUBTOTAL -->
        <div>
          $${lineTotal.toFixed(2)}
        </div>
    `;

    container.appendChild(div);
  });

  document.getElementById("subtotal").innerText = "$" + subtotal.toFixed(2);

  attachEvents();
}

// ---------------- EVENTS FOR QTY + REMOVE ----------------

function attachEvents() {
  // Change quantity
  document.querySelectorAll(".qty-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const idx = Number(e.target.dataset.idx);
      let value = Number(e.target.value);

      if (value < 1) value = 1;

      const cart = getCart();
      cart[idx].qty = value;

      saveCart(cart);
      renderCart();
    });
  });

  // Remove item
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = Number(e.target.dataset.idx);

      const cart = getCart();
      cart.splice(idx, 1);

      saveCart(cart);
      renderCart();
    });
  });
}

// ---------------- ON PAGE LOAD ----------------

document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  document.getElementById("back").addEventListener("click", () => {
    window.location.href = "products.html";
  });

  document.getElementById("checkout").addEventListener("click", () =>
    alert("Proceed to checkout (not implemented)")
  );

  updateTopCount();
});
