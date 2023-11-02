// Отслеживаем клие на странице
window.addEventListener('click', (event) => {
  // Проверяем что Клик был совершен по кнопке "Добавить в корзину"
  if (event.target.hasAttribute('data-cart')) {
    // находим карточку товара внутри которой был совершен Клик
    const card = event.target.closest('.page-hero__item');
    console.log(card);
  }
  // Собираем данные с этого товара и записываем их в единый объект productInfo
  const productInfo = {
    id: card.dataset.id,
    imgSrc: card.querySelector('.page-hero__img').getAttribute('src'),
    title:  card.querySelector('.page-hero__title').innerText,
  };
});