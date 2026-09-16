/* =========================================================
   КВАНТ — логика страницы каталога
   Фильтрация по категории, сортировка по цене, поиск по названию.
   ========================================================= */

let currentCategory = 'all';
let currentSort = 'default';

const productsGrid = document.getElementById('productsGrid');
const emptyState   = document.getElementById('emptyState');
const filtersBar   = document.getElementById('filters');
const sortSelect   = document.getElementById('sortSelect');
const searchInput  = document.getElementById('searchInput');

/**
 * Возвращает список товаров с учётом текущего фильтра,
 * поиска и сортировки.
 */
function getVisibleProducts() {
  const query = searchInput.value.trim().toLowerCase();

  let list = PRODUCTS.filter(item => {
    const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
    const matchesQuery = item.title.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  if (currentSort === 'price-asc') {
    list = list.slice().sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-desc') {
    list = list.slice().sort((a, b) => b.price - a.price);
  }

  return list;
}

function renderCatalog() {
  const visible = getVisibleProducts();
  productsGrid.innerHTML = visible.map(renderProductCard).join('');
  emptyState.hidden = visible.length > 0;
}

/* Обновляет подписи кнопок "В корзину" после изменений в корзине */
function onCartChanged() {
  renderCatalog();
}

filtersBar.addEventListener('click', event => {
  const button = event.target.closest('.filter-btn');
  if (!button) return;

  filtersBar.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('is-active'));
  button.classList.add('is-active');

  currentCategory = button.dataset.category;
  renderCatalog();
});

sortSelect.addEventListener('change', () => {
  currentSort = sortSelect.value;
  renderCatalog();
});

searchInput.addEventListener('input', renderCatalog);

/* Если пришли по ссылке catalog.html?q=..., подставляем запрос в поиск */
const initialQuery = new URLSearchParams(window.location.search).get('q');
if (initialQuery) {
  searchInput.value = initialQuery;
}

renderCatalog();
