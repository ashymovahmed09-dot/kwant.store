/* =========================================================
   КВАНТ — логика страницы товара
   Товар определяется параметром ?id= в адресе страницы,
   например product.html?id=p1
   ========================================================= */

const productId = new URLSearchParams(window.location.search).get('id');
const product = productId ? findProductById(productId) : null;
const root = document.getElementById('productRoot');

let selectedQty = 1; // сколько штук добавить в корзину за один клик

if (!product) {
  renderNotFound();
} else {
  renderProduct(product);
}

/**
 * Показывает сообщение, если товар не найден по id из адреса.
 */
function renderNotFound() {
  root.innerHTML = `
    <section class="product-page">
      <p class="empty-state">
        Товар не найден. <a href="catalog.html" style="color: var(--accent);">Вернуться в каталог</a>
      </p>
    </section>
  `;
}

/**
 * Строит всю разметку страницы товара: хлебные крошки, галерею,
 * цену, описание, таблицу характеристик и похожие товары.
 */
function renderProduct(item) {
  document.title = `${item.title} — КВАНТ`;

  const oldPriceHtml = item.oldPrice ? `<small>${formatPrice(item.oldPrice)}</small>` : '';
  const specRows = item.fullSpecs.map(
    spec => `<tr><td>${spec.label}</td><td>${spec.value}</td></tr>`
  ).join('');

  root.innerHTML = `
    <section class="product-page">
      <div class="breadcrumb">
        <a href="index.html">Главная</a> /
        <a href="catalog.html">Каталог</a> /
        <span>${item.title}</span>
      </div>

      <div class="product-layout">
        <div class="product-gallery">${CATEGORY_ICONS[item.category]}</div>

        <div class="product-info">
          <span class="product-info__category">${item.categoryLabel}</span>
          <h1 class="product-info__title">${item.title}</h1>

          <div class="product-info__price">
            ${formatPrice(item.price)}
            ${oldPriceHtml}
          </div>

          <p class="product-info__desc">${item.description}</p>

          <div class="product-info__actions">
            <div class="qty" id="qtySelector">
              <button data-step="-1" aria-label="Уменьшить количество">−</button>
              <span id="qtyValue">1</span>
              <button data-step="1" aria-label="Увеличить количество">+</button>
            </div>
            <button class="btn btn--primary" id="productAddBtn">В корзину</button>
          </div>

          <table class="spec-table">
            <tr><th colspan="2">Характеристики</th></tr>
            ${specRows}
          </table>
        </div>
      </div>

      <div class="related" id="relatedSection"></div>
    </section>
  `;

  initQtySelector();
  initAddToCart(item);
  renderRelated(item);
}

/**
 * Кнопки +/- рядом с "В корзину" меняют количество,
 * которое будет добавлено за один клик.
 */
function initQtySelector() {
  const qtySelector = document.getElementById('qtySelector');
  const qtyValue = document.getElementById('qtyValue');

  qtySelector.addEventListener('click', event => {
    const button = event.target.closest('[data-step]');
    if (!button) return;

    selectedQty = Math.max(1, selectedQty + Number(button.dataset.step));
    qtyValue.textContent = selectedQty;
  });
}

/**
 * Добавляет выбранное количество товара в корзину.
 */
function initAddToCart(item) {
  document.getElementById('productAddBtn').addEventListener('click', () => {
    addToCart(item.id, selectedQty);
    selectedQty = 1;
    document.getElementById('qtyValue').textContent = '1';
  });
}

/**
 * Показывает до 4 товаров той же категории, кроме текущего.
 */
function renderRelated(item) {
  const related = PRODUCTS.filter(p => p.category === item.category && p.id !== item.id).slice(0, 4);
  const section = document.getElementById('relatedSection');
  if (!related.length) {
    section.innerHTML = '';
    return;
  }

  section.innerHTML = `
    <h2 class="related__title">Похожие товары</h2>
    <div class="products-grid">${related.map(renderProductCard).join('')}</div>
  `;
}

/* Обновляет цену/кнопки похожих товаров после изменений в корзине */
function onCartChanged() {
  if (product) renderRelated(product);
}
