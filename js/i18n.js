/* =========================================
   KINOMORI i18n ENGINE
   Supports: en, es, fr, zh
   ========================================= */

const I18N = {
  currentLang: 'en',
  translations: {},

  async init() {
    const saved = localStorage.getItem('kinomori_lang');
    const browserLang = navigator.language.slice(0, 2);
    const defaultLang = saved || (['en','es','fr','zh'].includes(browserLang) ? browserLang : 'en');
    await this.load(defaultLang);
    this.renderSelector();
  },

  async load(lang) {
    this.currentLang = lang;
    localStorage.setItem('kinomori_lang', lang);
    document.documentElement.lang = lang;

    try {
      const res = await fetch(`locales/${lang}.json`);
      this.translations = await res.json();
    } catch (e) {
      console.warn('i18n load failed, falling back to en');
      if (lang !== 'en') {
        const res = await fetch('locales/en.json');
        this.translations = await res.json();
      }
    }

    this.apply();
    this.updateCartTexts();
  },

  t(keyPath, fallback = '') {
    const keys = keyPath.split('.');
    let val = this.translations;
    for (const k of keys) {
      val = val?.[k];
      if (val === undefined) return fallback || keyPath;
    }
    return val;
  },

  apply() {
    // Simple text replacements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const text = this.t(key);
      if (text !== key) el.textContent = text;
    });

    // HTML replacements (for <em>, <strong> inside)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.dataset.i18nHtml;
      const text = this.t(key);
      if (text !== key) el.innerHTML = text;
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      const text = this.t(key);
      if (text !== key) el.placeholder = text;
    });

    // Meta title / description
    const titleKey = document.querySelector('meta[data-i18n-title]')?.dataset.i18nTitle;
    if (titleKey) {
      const title = this.t(titleKey);
      if (title !== titleKey) document.title = title;
    }

    // Active lang button
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
    });
  },

  updateCartTexts() {
    // Update cart drawer strings injected by cart.js
    const cartHeader = document.querySelector('.cart-header h3');
    if (cartHeader && this.translations.cart?.title) cartHeader.textContent = this.t('cart.title');

    const emptyCart = document.querySelector('.cart-empty');
    if (emptyCart && this.translations.cart?.empty) emptyCart.textContent = this.t('cart.empty');

    const cartTotalLabel = document.querySelector('.cart-total span:first-child');
    if (cartTotalLabel && this.translations.cart?.total) cartTotalLabel.textContent = this.t('cart.total');

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn && this.translations.cart?.checkout) checkoutBtn.textContent = this.t('cart.checkout');
  },

  renderSelector() {
    const container = document.getElementById('langSelector');
    if (!container) return;

    const langs = [
      { code: 'en', label: 'EN' },
      { code: 'es', label: 'ES' },
      { code: 'fr', label: 'FR' },
      { code: 'zh', label: '中文' },
    ];

    container.innerHTML = langs.map(l =>
      `<button class="lang-btn ${l.code === this.currentLang ? 'active' : ''}" data-lang="${l.code}" aria-label="Switch to ${l.code}">${l.label}</button>`
    ).join('');

    container.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => this.load(btn.dataset.lang));
    });
  }
};

document.addEventListener('DOMContentLoaded', () => I18N.init());
