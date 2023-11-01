// Отслеживаем клие на странице
window.addEventListener('click', (event) => {

  // Проверяем что Клик был совершен по кнопке "Добавить в корзину"
  if (event.target.hasAttribute('data-cart')) {

    // находим карточку товара внутри которой был совершен Клик
    const card = event.target.closest('.page-hero__price-wrap');
    console.log(card);

  }
});