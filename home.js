/* =========================================================
   КВАНТ — логика главной страницы
   Показывает подборку "Хиты продаж": товары с отметкой badge,
   при нехватке — дополняет первыми товарами каталога.
   ========================================================= */

function getFeaturedProducts(limit = 4) {
  const badged = PRODUCTS.filter(item => item.badge);
  const rest = PRODUCTS.filter(item => !item.badge);
  return badged.concat(rest).slice(0, limit);
}

function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  grid.innerHTML = getFeaturedProducts().map(renderProductCard).join('');
}

/* Кнопки "В корзину" в подборке меняют подпись после добавления */
function onCartChanged() {
  renderFeatured();
}

renderFeatured();
