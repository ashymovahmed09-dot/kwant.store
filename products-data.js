/* =========================================================
   КВАНТ — данные каталога
   Подключается ПЕРВЫМ на каждой странице, до common.js
   и до скрипта конкретной страницы.
   ========================================================= */

const PRODUCTS = [
  {
    id: 'p1',
    category: 'phone',
    categoryLabel: 'Смартфон',
    title: 'Nova X13 Pro',
    badge: 'Хит продаж',
    specs: ['6.7" AMOLED, 120 Гц', '256 ГБ / 12 ГБ ОЗУ', 'Автономность до 29 ч'],
    price: 74990,
    oldPrice: 84990,
    description: 'Флагман линейки Nova с самым ярким экраном в модельном ряду и корпусом с защитой IP68. Подходит тем, кто снимает много видео и не хочет думать о зарядке в течение дня.',
    fullSpecs: [
      { label: 'Экран', value: '6.7" AMOLED, 120 Гц, до 1300 нит' },
      { label: 'Процессор', value: '8-ядерный, техпроцесс 4 нм' },
      { label: 'Память', value: '256 ГБ (UFS 4.0) / 12 ГБ ОЗУ' },
      { label: 'Камера', value: '50 + 12 + 8 Мп, оптическая стабилизация' },
      { label: 'Аккумулятор', value: '5000 мАч, зарядка 67 Вт' },
      { label: 'Защита', value: 'IP68' },
      { label: 'Вес', value: '189 г' },
    ],
  },
  {
    id: 'p2',
    category: 'phone',
    categoryLabel: 'Смартфон',
    title: 'Nova Lite 5G',
    badge: null,
    specs: ['6.4" IPS, 90 Гц', '128 ГБ / 8 ГБ ОЗУ', 'Быстрая зарядка 45 Вт'],
    price: 32990,
    oldPrice: null,
    description: 'Бюджетная модель с поддержкой 5G и достаточным запасом производительности для повседневных задач: соцсети, навигация, лёгкие игры.',
    fullSpecs: [
      { label: 'Экран', value: '6.4" IPS, 90 Гц' },
      { label: 'Процессор', value: '8-ядерный, средний класс' },
      { label: 'Память', value: '128 ГБ / 8 ГБ ОЗУ' },
      { label: 'Камера', value: '50 + 2 Мп' },
      { label: 'Аккумулятор', value: '5000 мАч, зарядка 45 Вт' },
      { label: 'Защита', value: 'нет' },
      { label: 'Вес', value: '186 г' },
    ],
  },
  {
    id: 'p3',
    category: 'laptop',
    categoryLabel: 'Ноутбук',
    title: 'Aether Book 14',
    badge: 'Новинка',
    specs: ['14" 2.8K, 100% sRGB', 'Ryzen 7 / 16 ГБ / 512 ГБ', 'Вес 1.3 кг'],
    price: 98990,
    oldPrice: 109990,
    description: 'Компактный ноутбук для работы с цветом и многозадачности: точная цветопередача экрана и запас памяти, чтобы не упираться в лимиты при монтаже и вёрстке.',
    fullSpecs: [
      { label: 'Дисплей', value: '14" 2.8K, 100% sRGB, 60 Гц' },
      { label: 'Процессор', value: 'Ryzen 7, 8 ядер' },
      { label: 'Память', value: '16 ГБ LPDDR5' },
      { label: 'Накопитель', value: '512 ГБ NVMe SSD' },
      { label: 'Порты', value: '2×USB-C, 1×USB-A, HDMI' },
      { label: 'Автономность', value: 'до 14 ч' },
      { label: 'Вес', value: '1.3 кг' },
    ],
  },
  {
    id: 'p4',
    category: 'laptop',
    categoryLabel: 'Ноутбук',
    title: 'Aether Book Air 13',
    badge: null,
    specs: ['13.3" IPS, 400 нит', 'Core i5 / 8 ГБ / 256 ГБ', 'Без вентилятора'],
    price: 67490,
    oldPrice: null,
    description: 'Лёгкий и полностью бесшумный ноутбук без вентилятора — хороший выбор для документов, браузера и учёбы, если не нужна высокая производительность.',
    fullSpecs: [
      { label: 'Дисплей', value: '13.3" IPS, 400 нит' },
      { label: 'Процессор', value: 'Core i5, пассивное охлаждение' },
      { label: 'Память', value: '8 ГБ' },
      { label: 'Накопитель', value: '256 ГБ SSD' },
      { label: 'Особенность', value: 'без вентилятора, бесшумный' },
      { label: 'Вес', value: '1.1 кг' },
    ],
  },
  {
    id: 'p5',
    category: 'audio',
    categoryLabel: 'Аудио',
    title: 'Pulse Buds Air',
    badge: 'Скидка',
    specs: ['Активное шумоподавление', 'До 32 ч с кейсом', 'IPX4'],
    price: 8990,
    oldPrice: 11990,
    description: 'Внутриканальные наушники с активным шумоподавлением и запасом автономности на несколько дней использования без подзарядки кейса.',
    fullSpecs: [
      { label: 'Тип', value: 'внутриканальные, с ANC' },
      { label: 'Автономность', value: '8 ч (наушники) + 24 ч (кейс)' },
      { label: 'Защита', value: 'IPX4' },
      { label: 'Bluetooth', value: '5.3' },
      { label: 'Вес пары', value: '5 г' },
    ],
  },
  {
    id: 'p6',
    category: 'audio',
    categoryLabel: 'Аудио',
    title: 'Pulse Over Studio',
    badge: null,
    specs: ['Накладные, 40 мм драйверы', 'До 60 ч работы', 'Bluetooth 5.3'],
    price: 15990,
    oldPrice: null,
    description: 'Накладные закрытые наушники для долгих рабочих сессий: большой запас автономности и возможность подключения по проводу, если сядет батарея.',
    fullSpecs: [
      { label: 'Тип', value: 'накладные, закрытые' },
      { label: 'Драйверы', value: '40 мм' },
      { label: 'Автономность', value: 'до 60 ч' },
      { label: 'Подключение', value: 'Bluetooth 5.3 и проводной режим' },
      { label: 'Вес', value: '250 г' },
    ],
  },
  {
    id: 'p7',
    category: 'accessory',
    categoryLabel: 'Аксессуар',
    title: 'GaN-зарядка 65 Вт',
    badge: null,
    specs: ['2×USB-C + 1×USB-A', 'Питание ноутбука и телефона', 'Компактный корпус'],
    price: 3490,
    oldPrice: null,
    description: 'Одна зарядка вместо трёх: одновременно питает ноутбук и телефон благодаря компактной GaN-технологии, занимает меньше места в сумке.',
    fullSpecs: [
      { label: 'Мощность', value: '65 Вт' },
      { label: 'Порты', value: '2×USB-C, 1×USB-A' },
      { label: 'Технология', value: 'GaN' },
      { label: 'Совместимость', value: 'ноутбуки до 65 Вт, смартфоны с PD' },
    ],
  },
  {
    id: 'p8',
    category: 'accessory',
    categoryLabel: 'Аксессуар',
    title: 'Docking Hub 8-в-1',
    badge: 'Скидка',
    specs: ['HDMI 4K60, USB 3.0 ×3', 'Card-reader SD/microSD', 'Ethernet 1 Гбит/с'],
    price: 5290,
    oldPrice: 6490,
    description: 'Расширяет один порт USB-C ноутбука до полноценного рабочего места: видео, проводная сеть, карты памяти и проходная зарядка.',
    fullSpecs: [
      { label: 'Видео', value: 'HDMI, до 4K60' },
      { label: 'USB', value: '3×USB 3.0' },
      { label: 'Карты памяти', value: 'SD / microSD' },
      { label: 'Сеть', value: 'Ethernet 1 Гбит/с' },
      { label: 'Питание', value: 'USB-C PD passthrough 100 Вт' },
      { label: 'Корпус', value: 'алюминий' },
    ],
  },
];

/* Иконки-заглушки для карточек и корзины, по категориям */
const CATEGORY_ICONS = {
  phone: '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>',
  laptop: '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="12" rx="1"/><path d="M2 20h20"/></svg>',
  audio: '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="14" width="5" height="7" rx="1.5"/><rect x="17" y="14" width="5" height="7" rx="1.5"/></svg>',
  accessory: '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="9" width="16" height="7" rx="2"/><path d="M8 9V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
};

/**
 * Находит товар по id. Возвращает undefined, если не найден.
 */
function findProductById(id) {
  return PRODUCTS.find(item => item.id === id);
}
