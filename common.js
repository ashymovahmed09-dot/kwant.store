/* =========================================================
   КВАНТ — общая логика для всех страниц
   Подключается на КАЖДОЙ странице ПОСЛЕ products-data.js
   и ПЕРЕД скриптом конкретной страницы.

   Отвечает за:
   - состояние корзины (хранится в localStorage, чтобы
     сохраняться при переходах между страницами);
   - открытие/закрытие боковой панели корзины;
   - мобильное меню (бургер);
   - переход из поиска в шапке на страницу каталога;
   - переиспользуемый рендер карточки товара.
   ========================================================= */

const CART_STORAGE_KEY = 'kvant_cart';

/**
 * Читает корзину из localStorage. Если данных нет
 * или они повреждены — возвращает пустой объект.
 */
function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    return {};
  }
}

/**
 * Сохраняет текущую корзину в localStorage.
 */
function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

const cart = loadCart(); // { productId: quantity }

/* ---------- Форматирование ---------- */

function formatPrice(value) {
  return value.toLocaleString('ru-RU') + ' ₽';
}

/* ---------- Операции с корзиной ---------- */

function addToCart(productId, qty = 1) {
  cart[productId] = (cart[productId] || 0) + qty;
  saveCart();
  refreshCartUI();
  if (typeof onCartChanged === 'function') onCartChanged();
}

function changeQuantity(productId, delta) {
  if (!cart[productId]) return;
  cart[productId] += delta;
  if (cart[productId] <= 0) delete cart[productId];
  saveCart();
  refreshCartUI();
  if (typeof onCartChanged === 'function') onCartChanged();
}

function removeFromCart(productId) {
  delete cart[productId];
  saveCart();
  refreshCartUI();
  if (typeof onCartChanged === 'function') onCartChanged();
}

function getCartCount() {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

function getCartTotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = findProductById(id);
    return sum + (product ? product.price * qty : 0);
  }, 0);
}

/* ---------- Переиспользуемый рендер карточки товара ---------- */

/**
 * Строит HTML карточки товара для сеток каталога/акций/похожих
 * товаров. Клик по изображению и названию ведёт на страницу
 * товара, кнопка "В корзину" в переход не участвует.
 */
function renderProductCard(item) {
  const specsHtml = item.specs.map(spec => `<li>${spec}</li>`).join('');
  const oldPriceHtml = item.oldPrice ? `<small>${formatPrice(item.oldPrice)}</small>` : '';
  const isInCart = Boolean(cart[item.id]);
  const badgeHtml = item.badge ? `<span class="card__badge">${item.badge}</span>` : '';

  return `
    <article class="card" data-id="${item.id}">
      ${badgeHtml}
      <a class="card__link" href="product.html?id=${item.id}">
        <div class="card__media">${CATEGORY_ICONS[item.category]}</div>
        <span class="card__category">${item.categoryLabel}</span>
        <h3 class="card__title">${item.title}</h3>
      </a>
      <ul class="card__specs">${specsHtml}</ul>
      <div class="card__footer">
        <div class="card__price">
          ${formatPrice(item.price)}
          ${oldPriceHtml}
        </div>
        <button class="card__add ${isInCart ? 'is-added' : ''}" data-add="${item.id}">
          ${isInCart ? 'В корзине' : 'В корзину'}
        </button>
      </div>
    </article>
  `;
}

/**
 * Строит HTML одной позиции внутри панели корзины.
 */
function renderCartItem(id, qty) {
  const product = findProductById(id);
  if (!product) return '';

  return `
    <div class="cart-item" data-id="${id}">
      <div class="cart-item__thumb">${CATEGORY_ICONS[product.category]}</div>
      <div>
        <p class="cart-item__title">${product.title}</p>
        <div class="cart-item__row">
          <div class="qty">
            <button data-qty="-1" aria-label="Уменьшить количество">−</button>
            <span>${qty}</span>
            <button data-qty="1" aria-label="Увеличить количество">+</button>
          </div>
          <span class="cart-item__price">${formatPrice(product.price * qty)}</span>
        </div>
        <button class="cart-item__remove" data-remove>Удалить</button>
      </div>
    </div>
  `;
}

/**
 * Перерисовывает счётчик в шапке и содержимое панели корзины.
 * Вызывается на каждой странице при загрузке и при любом
 * изменении состава корзины.
 */
function refreshCartUI() {
  const cartCountEl = document.getElementById('cartCount');
  const cartTotalEl = document.getElementById('cartTotal');
  const cartItemsBox = document.getElementById('cartItems');
  if (!cartCountEl || !cartTotalEl || !cartItemsBox) return;

  const entries = Object.entries(cart);

  cartCountEl.textContent = getCartCount();
  cartTotalEl.textContent = formatPrice(getCartTotal());

  cartItemsBox.innerHTML = entries.length
    ? entries.map(([id, qty]) => renderCartItem(id, qty)).join('')
    : '<p class="cart-empty">Корзина пока пуста. Добавьте что-нибудь из каталога.</p>';
}

/* ---------- Инициализация общих элементов шапки/панели ---------- */

document.addEventListener('DOMContentLoaded', () => {
  const cartBtn      = document.getElementById('cartBtn');
  const cartOverlay  = document.getElementById('cartOverlay');
  const cartPanel    = document.getElementById('cartPanel');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartItemsBox = document.getElementById('cartItems');
  const checkoutBtn  = document.getElementById('checkoutBtn');
  const burgerBtn    = document.getElementById('burgerBtn');
  const mobileNav    = document.getElementById('mobileNav');
  const searchForm   = document.getElementById('searchForm');

  refreshCartUI();

  /* Открытие / закрытие боковой панели корзины */
  function openCart() {
    cartPanel.classList.add('is-open');
    cartOverlay.classList.add('is-visible');
    cartPanel.setAttribute('aria-hidden', 'false');
  }
  function closeCart() {
    cartPanel.classList.remove('is-open');
    cartOverlay.classList.remove('is-visible');
    cartPanel.setAttribute('aria-hidden', 'true');
  }

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  /* Клики внутри панели корзины: +/- количество и удаление позиции */
  if (cartItemsBox) {
    cartItemsBox.addEventListener('click', event => {
      const itemEl = event.target.closest('.cart-item');
      if (!itemEl) return;
      const id = itemEl.dataset.id;

      const qtyButton = event.target.closest('[data-qty]');
      if (qtyButton) {
        changeQuantity(id, Number(qtyButton.dataset.qty));
        return;
      }
      if (event.target.closest('[data-remove]')) {
        removeFromCart(id);
      }
    });
  }

  /* Оформление заказа (демо: очищает корзину) */
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (getCartCount() === 0) {
        alert('Корзина пуста — сначала добавьте товары.');
        return;
      }
      alert(`Заказ на сумму ${formatPrice(getCartTotal())} оформлен. Спасибо за покупку!`);
      Object.keys(cart).forEach(id => delete cart[id]);
      saveCart();
      refreshCartUI();
      if (typeof onCartChanged === 'function') onCartChanged();
      closeCart();
    });
  }

  /* Мобильное меню */
  if (burgerBtn && mobileNav) {
    burgerBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('is-open');
    });
  }

  /* Поиск в шапке: переводит на страницу каталога с параметром q */
  if (searchForm) {
    searchForm.addEventListener('submit', event => {
      event.preventDefault();
      const value = searchForm.querySelector('input').value.trim();
      window.location.href = 'catalog.html' + (value ? `?q=${encodeURIComponent(value)}` : '');
    });
  }

  /* Делегирование клика "В корзину" — работает на любой странице,
     где в разметке встречаются карточки товаров */
  document.body.addEventListener('click', event => {
    const button = event.target.closest('[data-add]');
    if (!button) return;
    addToCart(button.dataset.add);
  });
});
