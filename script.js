const menuItems = [
  { name: "Plain Maggi", price: 25 },
  { name: "Veggie Maggi", price: 35 },
  { name: "Bread Roll", price: 40 },
  { name: "Sandwich", price: 40 },
  { name: "Veg Chilla", price: 25 },
  { name: "Noodles (Half)", price: 20 },
  { name: "Noodles (Full)", price: 40 },
  { name: "Momos", price: 40 }
];

let cart = [];

function renderMenu() {
  const menu = document.getElementById('menu');
  menu.innerHTML = "<h2>Menu</h2>";
  menuItems.forEach((item, index) => {
    const btn = `<button onclick="addToCart(${index})">Add</button>`;
    menu.innerHTML += `<p>${item.name} - ₹${item.price} ${btn}</p>`;
  });
}

function addToCart(index) {
  cart.push(menuItems[index]);
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  const cartDiv = document.getElementById('cart');
  cartDiv.innerHTML = "<h2>Cart</h2>";
  cart.forEach((item, index) => {
    const btn = `<button onclick="removeItem(${index})">Remove</button>`;
    cartDiv.innerHTML += `<p>${item.name} - ₹${item.price} ${btn}</p>`;
  });
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartDiv.innerHTML += `<h3>Total: ₹${total}</h3>`;
  if (cart.length > 0) {
    cartDiv.innerHTML += `<p>Estimated time: 15 minutes</p>`;
  }
}

function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  const summary = cart.map(item => `${item.name} (₹${item.price})`).join(", ");
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const message = `Your order from Anirudh's Food Corner:\n\n${summary}\n\nTotal: ₹${total}`;
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;

  window.open(url, '_blank');
  cart = [];
  renderCart();
  alert("Order placed! Your cart has been cleared.");

  setTimeout(() => {
    alert("Your order is ready! Please collect it from the counter.");
  }, 10000);
}

document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  renderCart();
  document.getElementById("orderBtn").addEventListener("click", placeOrder);
});