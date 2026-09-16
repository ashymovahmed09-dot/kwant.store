/* =========================================================
   КВАНТ — логика страницы "Акции"
   Показывает только товары, у которых указана старая цена.
   ========================================================= */

function renderSale() {
  const grid = document.getElementById('saleGrid');
  const emptyState = document.getElementById('emptyState');
  const discounted = PRODUCTS.filter(item => item.oldPrice);

  grid.innerHTML = discounted.map(renderProductCard).join('');
  emptyState.hidden = discounted.length > 0;
}

/* Обновляет подписи кнопок "В корзину" после изменений в корзине */
function onCartChanged() {
  renderSale();
}

renderSale();
