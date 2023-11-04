// обертка внутри корзины для добавления товаров
const cartList = document.querySelector('.cart__list');

// функция подсчета общей стоимости корзины
const calcCartPrice = () => {
  // получим все товары в корзине
  const cartItems = document.querySelectorAll('.cart__item');
  // найдем где в корзине отображается общая цена
  const totalCartPrice = document.querySelector('.check__total-price');
  // найдем где в корзине отображается общее количество товара
  const totalCartAmount = document.querySelector('.check__point_amount');
  // найдем элемент отображения цены ДО скидки
  const totalFirstPrice = document.querySelector('.check__description_price');
  // найдем элемент отображения скидки в корзине
  const totalSale = document.querySelector('.check__description_sale');


  // объявим счетчик общей цены Итого
  let totalPrice = 0;

  // объявим счетчик общей цены ДО СКИДКИ
  let firstPriceTotal = 0;

  // объявим счетчик общего количества товаров
  let totalAmount = 0;

  // перебираем все items в корзине
  cartItems.forEach(item => {
    // находим в item количество и цену
    const amountEl = item.querySelector('[data-counter]');
    const priceEl = item.querySelector('.cart__price-current');
    // находим цену товара ДО скидки
    const firstPriceEl = item.querySelector('.cart__price-not-sale');

    // перемножаем количество на цену каждого item
    const currentPrice = parseInt(amountEl.innerText) *
      parseInt(priceEl.innerText);

    // перемножаем количество на цену ДО СКИДКИ каждого item
    const currentFirstPrice = parseInt(amountEl.innerText) *
    parseInt(firstPriceEl.innerText);

    // добавляем к счетчику общей цены
    totalPrice += currentPrice;

    // добавляем к счетчику общей цены ДО СКИДКИ
    firstPriceTotal += currentFirstPrice;

    // добавляем к счетчику общее количество товара в items
    totalAmount += parseInt(amountEl.innerText);
  });
  // отображаем цену на страницу
  totalCartPrice.innerHTML = `${totalPrice} ₽`;

  // отображаем цену ДО СКИДКИ на страницу
  totalFirstPrice.innerHTML = `${firstPriceTotal} ₽`;

  // отображаем скидку на общее количество товара
  totalSale.innerHTML = `${firstPriceTotal - totalPrice} ₽`;
  // отображаем общее количество товара в корзине
  totalCartAmount.innerHTML = `Товары, ${totalAmount} шт.`;
};

// получим данные из localStorage
const item_01 = JSON.parse(localStorage.getItem('id_01'));

if (item_01) {
  // собранные данные подставим в шаблон для товаров в корзине
  const cartItemHTML = `
    <li class="cart__item cart__item_1" data-id=${item_01.id}>
    <label class="cart__label visually-hidden" for="cartGood-1">
      Выбрать этот товар
      </label>
    <input 
      class="cart__input cart__input_item" 
      id="cartGood-1" 
      type="checkbox" 
      name="userGoods" 
      value="1">
    <div class="cart__common-info-wrap">
      <div class="cart__image-wrap">
        <img 
          class="cart__image" 
          src="${item_01.imgSrc}" 
          alt="${item_01.title}">
      </div>
      <div class="cart__description-wrap">
        <p class="cart__description-title">
          ${item_01.title}
          </p>
        <p class="cart__description">Цвет: черный</p>
        <p class="cart__description">Оперативная память: 16 ГБ</p>
      </div>              
    </div>
    
    <div class="cart__counter-wrap">
      <button 
        class="cart__counter-btn cart__counter-btn_prev"
        type="button" 
        data-action="minus">
          −
      </button>
      <span class="cart__count" data-counter>1</span>
      <button 
        class="cart__counter-btn cart__counter-btn_next"
        type="button" 
        data-action="plus"
        >
          +
      </button>
    </div>
    <div class="cart__price-wrap">
      <p class="cart__price-current">${item_01.price}</p>
      <p class="cart__price-not-sale">${item_01.firstPrice}</p>
      <a class="cart__price-bank" href="">В кредит от 5600 ₽</a>
    </div>
    </li>
  `;

  // отобразим товар в корзине
  cartList?.insertAdjacentHTML('beforeend', cartItemHTML);

  /* Отображение img в карточке доставка */
  // получим объекты обертки для img
  const cartDeliveryList = document.querySelector('.delivery__preview-wrap');
  if (cartDeliveryList) {
    // создадим новый item
    const cartDeliveryItem = document.createElement('li');
    // добавляяем классы для item
    cartDeliveryItem.classList.add('delivery__preview');
    // добавляяем дата-атрибут для item взяв его из localStorage
    cartDeliveryItem.setAttribute('data-id', `${item_01.id}`);
    // добавляем картинку через стили
    cartDeliveryItem.style.backgroundImage = `url(${item_01.imgSrc})`;
    // вставляем карточку с изображением товара в карточку доставки
    cartDeliveryList.append(cartDeliveryItem);
  }


  // пересчет общей стоимости товаров в корзине
  // проверяем по URL что открыта корзина
  if (window.location.pathname === '/cart.html') calcCartPrice();
}

// Отслеживаем клик на странице
window.addEventListener('click', (event) => {
  // объявляем переменную для счетчика
  let counter;

  // проверяем клик строго по кнопкам Плюс или Минус
  if (event.target.dataset.action === 'plus' ||
      event.target.dataset.action === 'minus') {
    // находим обертку счетчика
    const counterWrapper = event.target.closest('.cart__counter-wrap');

    // находим span с числом счетчика
    counter = counterWrapper.querySelector('[data-counter]');
  }


  // Проверяем является ли элемент по которому был клик кнопкой Плюс
  if (event.target.dataset.action === 'plus') {
    // изменяем текст в счетчике увеличиваяы его на 1
    counter.innerText = ++counter.innerText;
    // пересчет общей стоимости товаров в корзине
    calcCartPrice();
  }
  // Проверяем является ли элемент по которому был клик кнопкой Плюс
  if (event.target.dataset.action === 'minus') {
    // проверяем чтобы счетчик больше 1
    if (parseInt(counter.innerText) > 1) {
      // изменяем текст в счетчике уменьшая его на 1
      counter.innerText = --counter.innerText;
      // пересчет общей стоимости товаров в корзине
      calcCartPrice();
    }
  }
});

// получим элементы чекбокса на странице
const checkboxAll = document.querySelector('.cart__input_all');
const checkbox = document.querySelectorAll('.cart__input_item');

// объявляем переменную для флага состояния чекбокса Выбрать все (выключен)
let checked = false;

// отслеживаем клик на чекбоксе Выбрать все
checkboxAll?.addEventListener('click', () => {
  // меняем по клику состояние чекбокса Выбрать все
  (!checked) ? (checked = true) : checked = false;

  // проверяем состояние чекбокса Выбрать все
  if (checked) {
    // если Выбрать все === true, то чекаем остальные чекбоксы
    checkbox.forEach(el => el.checked = true);
  } else {
    checkbox.forEach(el => el.checked = false);
  }
});

// получим кнопку Удалить со страницы
const deleteBtn = document.querySelector('.cart__del');
// слушаем клик по кнопке удалить из корзины
if (deleteBtn) {
  deleteBtn.addEventListener('click', () => {
    // перебираем все чекбоксы
    checkbox.forEach(el => {
      // если чекбокс нажат, то
      if (el.checked === true) {
        // получим item с карточки ДОСТАВКА в корзине
        const deliveryImg = document.querySelector('.delivery__preview');
        // если дата атрибут item совпадает с id из Storage то удаляем карточку
        if (deliveryImg.dataset.id === `${item_01.id}`) deliveryImg.remove();

        // удаляем из storage объект по его id
        localStorage.removeItem(`id_${el.closest('.cart__item ').dataset.id}`);
        // удаляем объект из верстки корзины
        el.closest('.cart__item ').remove();


        // пересчет общей стоимости товаров в корзине
        calcCartPrice();
      }
    });
  });
}


// calcCartPrice();
