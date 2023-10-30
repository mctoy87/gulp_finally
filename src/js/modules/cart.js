const counterText = document.querySelector('.cart__count');
const counterBtn = document.querySelectorAll('.cart__counter-btn');
const checkbox = document.querySelectorAll('.cart__input_item');
const checkboxAll = document.querySelector('.cart__input_all');

let counter = 1;
let checked = false;

const setDisabled = () => {
  if (counter === 1) {
    counterBtn[0].disabled = true;
  } else {
    counterBtn[0].disabled = false;
  }
};


counterBtn.forEach((el, index) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    if (index === 0 && counter > 1) {
      counter--;
    } else if (index === 1) {
      counter++;
    }
    counterText.textContent = counter;
    setDisabled();
  });
});

checkboxAll.addEventListener('click', () => {
  (!checked) ? (checked = true) : checked = false;

  if (checked) {
    checkbox.forEach(el => el.checked = true);
  } else {
    checkbox.forEach(el => el.checked = false);
  }
});


