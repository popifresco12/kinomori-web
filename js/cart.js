/* =========================================
   KINOMORI CART ENGINE
   ========================================= */

const CART_KEY = 'kinomori_cart';

let cart = [];

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    cart = raw ? JSON.parse(raw) : [];
  } catch (e) {
    cart = [];
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function getCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function addToCart(id, name, price) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price: parseInt(price, 10), qty: 1 });
  }
  saveCart();
  renderCart();
  updateCartCount();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
  updateCartCount();
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }
  saveCart();
  renderCart();
  updateCartCount();
}

function updateCartCount() {
  const badge = document.getElementById('cartCount');
  if (badge) {
    badge.textContent = getCount();
    badge.style.display = getCount() > 0 ? 'grid' : 'none';
  }
}

function getProductImage(id) {
  const map = {
    'c1': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop',
    'c2': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop',
    'a1': 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop',
    'a2': 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
    'h1': 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=600&fit=crop',
    'h2': 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&h=600&fit=crop',
    's1': 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop',
    's2': 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop',
    'y1': 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop',
    'y2': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop',
    'su1': 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&h=600&fit=crop',
    'su2': 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&h=600&fit=crop',
  };
  return map[id] || '';
}

function getCategoryEmoji(name) {
  if (name.includes('Shirt') || name.includes('Tee')) return '👕';
  if (name.includes('Tote')) return '🧵';
  if (name.includes('Bracelet')) return '📿';
  if (name.includes('Bowl')) return '🏺';
  if (name.includes('Candle')) return '🕯️';
  if (name.includes('Oil')) return '🧴';
  if (name.includes('Sunscreen')) return '☀️';
  if (name.includes('Mat')) return '🧘';
  if (name.includes('Block')) return '🪵';
  if (name.includes('Wax')) return '🏄‍♂️';
  if (name.includes('Sock')) return '🌊';
  return '📦';
}

function getCategoryClass(name) {
  if (name.includes('Shirt') || name.includes('Tee')) return 'clothing';
  if (name.includes('Tote') || name.includes('Bracelet')) return 'accessories';
  if (name.includes('Bowl') || name.includes('Candle')) return 'home';
  if (name.includes('Oil') || name.includes('Sunscreen')) return 'skincare';
  if (name.includes('Mat') || name.includes('Block')) return 'yoga';
  if (name.includes('Wax') || name.includes('Sock')) return 'surf';
  return 'clothing';
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty">Your cart is empty.</div>';
    if (totalEl) totalEl.textContent = '0 MAD';
    if (checkoutBtn) checkoutBtn.style.pointerEvents = 'none';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${getProductImage(item.id)}" alt="${item.name}" class="cart-item-image" style="width:60px;height:60px;object-fit:cover;border-radius:8px;">
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${item.price} MAD</div>
      </div>
      <div class="cart-item-actions">
        <button class="qty-btn" onclick="updateQty('${item.id}', -1)">−</button>
        <span>${item.qty}</span>
        <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
        <button class="remove-item" onclick="removeFromCart('${item.id}')">Remove</button>
      </div>
    </div>
  `).join('');

  if (totalEl) totalEl.textContent = getTotal() + ' MAD';
  if (checkoutBtn) {
    checkoutBtn.style.pointerEvents = 'auto';
    checkoutBtn.href = generateWhatsAppLink();
  }
}

function generateWhatsAppLink() {
  const phone = '212600000000'; // Placeholder — replace with real number
  let text = 'Hello Kinomori! I would like to order:%0A%0A';
  cart.forEach(item => {
    text += `- ${item.name} x${item.qty} = ${item.price * item.qty} MAD%0A`;
  });
  text += `%0ATotal: ${getTotal()} MAD%0A%0AThank you!`;
  return `https://wa.me/${phone}?text=${text}`;
}

/* Drawer Controls */
function openCart() {
  document.getElementById('cartDrawer')?.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

/* Init */
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  updateCartCount();
  renderCart();

  // Add to cart buttons
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const price = btn.dataset.price;
      addToCart(id, name, price);
    });
  });

  // Drawer toggles
  document.getElementById('cartTrigger')?.addEventListener('click', openCart);
  document.getElementById('closeCart')?.addEventListener('click', closeCart);
  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
});
