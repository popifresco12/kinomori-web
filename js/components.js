/* =========================================
   KINOMORI SHARED COMPONENTS
   Injects navbar + cart drawer + footer
   ========================================= */

function getNavLinks() {
  const page = location.pathname.split('/').pop() || 'index.html';
  const isHome = page === '' || page === 'index.html';
  const isStory = page === 'story.html';
  const isShop = page === 'shop.html';
  const isContact = page === 'contact.html';

  return `
    <li><a href="${isHome ? '#' : 'index.html'}" data-i18n="nav.home">Home</a></li>
    <li><a href="${isStory ? '#' : 'story.html'}" data-i18n="nav.story">Our Story</a></li>
    <li><a href="${isShop ? '#' : 'shop.html'}" data-i18n="nav.shop">Shop</a></li>
    <li><a href="${isContact ? '#' : 'contact.html'}" data-i18n="nav.contact">Contact</a></li>
    <li class="lang-selector-wrap" id="langSelector"></li>
    <li>
      <button class="cart-trigger" id="cartTrigger" aria-label="Open cart">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
        </svg>
        <span class="cart-count" id="cartCount">0</span>
      </button>
    </li>
  `;
}

function injectNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  nav.innerHTML = `
    <div class="container">
      <a href="index.html" class="logo">
        KINOMORI
        <span data-i18n="nav.logo_sub">Asian Kitchen</span>
      </a>
      <ul class="nav-links" id="navLinks">
        ${getNavLinks()}
      </ul>
      <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </div>
  `;
}

function injectCartDrawer() {
  let drawer = document.getElementById('cartDrawer');
  if (drawer) return; // already in page

  const overlay = document.createElement('div');
  overlay.className = 'cart-overlay';
  overlay.id = 'cartOverlay';
  document.body.appendChild(overlay);

  drawer = document.createElement('div');
  drawer.className = 'cart-drawer';
  drawer.id = 'cartDrawer';
  drawer.innerHTML = `
    <div class="cart-header">
      <h3 data-i18n="cart.title">Your Cart</h3>
      <button class="close-cart" id="closeCart" aria-label="Close cart">&times;</button>
    </div>
    <div class="cart-items" id="cartItems">
      <div class="cart-empty" data-i18n="cart.empty">Your cart is empty.</div>
    </div>
    <div class="cart-footer">
      <div class="cart-total">
        <span data-i18n="cart.total">Total</span>
        <span id="cartTotal">0 MAD</span>
      </div>
      <a href="#" class="checkout-btn" id="checkoutBtn" data-i18n="cart.checkout">Order via WhatsApp</a>
    </div>
  `;
  document.body.appendChild(drawer);
}

function injectFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="container">
      <div class="contact-grid">
        <div class="contact-brand">
          <h3>KINOMORI</h3>
          <p data-i18n="footer.tagline">A small kitchen and shop on the Atlantic coast, serving honest Asian food and curated goods for people who live slowly.</p>
        </div>
        <div class="contact-links">
          <h4 data-i18n="footer.visit">Visit Us</h4>
          <a href="#">Tamraght, Agadir-Ida Ou Tanane</a>
          <a href="#">Morocco</a>
          <a href="mailto:hello@kinomori.ma">hello@kinomori.ma</a>
          <a href="https://wa.me/212600000000" target="_blank">+212 600 000 000</a>
        </div>
        <div class="contact-social">
          <h4 data-i18n="footer.follow">Follow</h4>
          <a href="https://www.instagram.com/kinomori_s/?hl=en" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 Kinomori. <span data-i18n="footer.crafted">Crafted with care in Tamraght.</span></p>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  injectNavbar();
  injectCartDrawer();
  injectFooter();
});
