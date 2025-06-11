const products = [
  { id: 1, name: "Chilli Milli", price: 20 },
  { id: 2, name: "Churan Chatni", price: 10 },
  { id: 3, name: "Orbeez", price: 50 },
  { id: 4, name: "Pop It Candy", price: 25 },
  { id: 5, name: "Slime Tub", price: 40 },
  { id: 6, name: "Tattoo Bubble Gum", price: 5 },
  { id: 7, name: "Center Fruit", price: 2 }
];

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function updateCartCount() {
  document.getElementById("cartCount")?.textContent = getCart().length;
}

if (window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/")) {
  const container = document.getElementById("products");
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `<strong>${p.name}</strong><br>Rs. ${p.price} &nbsp;
      <button onclick="addToCart(${p.id})">Add to Cart</button>`;
    container.appendChild(div);
  });
  updateCartCount();
}

function addToCart(id) {
  const cart = getCart();
  cart.push(id);
  saveCart(cart);
  updateCartCount();
}

if (window.location.pathname.endsWith("cart.html")) {
  const cartContainer = document.getElementById("cartItems");
  const cart = getCart();
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    const counts = {};
    cart.forEach(id => (counts[id] = (counts[id] || 0) + 1));
    Object.entries(counts).forEach(([id, qty]) => {
      const p = products.find(x => x.id === +id);
      const div = document.createElement("div");
      div.className = "cart-item";
      div.textContent = `${p.name} × ${qty} = Rs. ${p.price * qty}`;
      cartContainer.appendChild(div);
    });
  }
  document.getElementById("placeOrder").onclick = () => {
    const name = document.getElementById("buyerName").value.trim();
    if (!name) return alert("Enter your name!");
    if (cart.length === 0) return alert("Cart is empty!");
    document.getElementById("message").textContent = `Thanks, ${name}! Your order has been placed.`;
    localStorage.removeItem("cart");
    updateCartCount();
  };
  updateCartCount();
}
