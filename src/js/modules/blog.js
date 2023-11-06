
const postsList = document.querySelector('.list');
const navList = document.querySelector('.nav__list');
const pageNav = document.querySelector('.page__nav ');


const getPostData = async () => {
  const pageParams = new URLSearchParams(location.search);
  const postPage = pageParams.get('page');


  const response = await fetch(`https://gorest.co.in/public-api/posts?page=${postPage === null ? 1 : postPage}`);
  const result = await response.json();

  return {
    data: result.data,
    pagination: result.meta.pagination,
    ueserId: result.data.user_id,
  };
};

const createPostList = async () => {
  const posts = await getPostData();
  let postItem = '';

  for (let i = 0; i < posts.data.length; i++) {
    postItem += `
      <li class="list__item item">
        <div class="item__image-wrapper">
          <img class="item__image" src="https://loremflickr.com/400/400?${i+1}" alt="Картинка к посту">
        </div>
        <div class="item__desc-wrapper">
          <h2 class="item__title">
            <a ="item__link" href="article.html?id=${posts.data[i].id}">
              ${posts.data[i].title}
            </a>
          </h2>
          <p class="item__date"></p>
          <div class="item__icons-wrapper">
            <span class="item__icons-review"></span>
            <span class="item__icons-comment"></span>
          </div>
        </div>
      </li>
    `;

    postsList.innerHTML = postItem;
  }
};

/* Пагинация простая */
const createPostNav = async () => {
  const pagination = await getPostData();
  let postNav = '';

  for (let i = 1; i < pagination.pagination.pages; i++) {
    postNav += `
    <li class="nav__item">
      <a href="blog.html?page=${i}" class="nav__link">
        ${i}
      </a>
    </li>
    `;
    navList.innerHTML = postNav;
    navList.style.overflow = 'auto';
  }
};

/* Пагинация сложная - помощь от Макса Лескина (трансляция 28/10/23) */

// создаем элементы пагинации. Передаем в функцию href, текст, актиная ли ссылка
const createItemPagination = (hrefLink, textContent, active) => {
  // создаем элемент пагинации  и присваиваем класс
  const li = document.createElement('li');
  li.className = 'pagination__item';
  // создаем ссылку внутри элемента и присваиваем класс
  const a = document.createElement('a');
  a.className = 'pagination__link';
  a.textContent = textContent;
  // задаем href ссылке
  a.href = hrefLink;
  // проверяем является ли ссылка активной
  if (active) {
    // если да, присваиваем доп класс
    a.classList.add('pagination__link_active');
  }
  // вставляем сслку в элемент
  li.append(a);
  // возвращаем элемент
  return li;
};

// создаем пагинацию
const pagination = (wrapper, pages, page, count) => {
  // очищаем обертку
  wrapper.textContent = '';

  // создаем список пагинации и задаем класс
  const paginationList = document.createElement('ul');
  paginationList.className = 'pagination__list';

  // проверяем является ли страница не первой или последней
  const isNotStart = page - Math.floor(count / 2) > 1;
  const isEnd = page + Math.floor(count / 2) > pages;

  // если страниц меньше чем количество элементов в счетчике пагинации
  if (count > pages) {
    // делаем количество элементов счетчика пагинации = кол-ву страниц
    count = pages;
  }

  // перебираем счетчик пагинации
  for (let i = 0; i < count; i++) {
    // начинаем с первой страницы счетчик
    let n = i + 1;

    // если не первая страница
    if (isNotStart) {
      // и если последняя страница
      if (isEnd) {
        // то отображаем счетчик с нужной страницы
        n = pages - count + i + 1;
      } else {
        // то отображаем счетчик с нужной страницы
        n = page - Math.floor(count / 2) + i;
      }
    }

    // вычисляем URL текущий
    const url = new URL(location);
    // задаем search параметр в зависимости от номера страницы
    url.searchParams.set('page', n);
    // создаем текущий элемент пагинации от url, текста и активной ссылки
    const li = createItemPagination(url, n, page === n);
    // встави элемент в список пагинации
    paginationList.append(li);
  }

  // когда цикл отработал - создаем элементы управления пагинацией
  // элемент стрелка влево 
  const firstItem = document.createElement('a');
  firstItem.classList.add('pagination__arrow', 'pagination__arrow_start');
  firstItem.href = isNotStart ? 'blog.html' : '';
  // элемент стрелка вправо
  const lastItem = document.createElement('a');
  lastItem.classList.add('pagination__arrow', 'pagination__arrow_end');
  lastItem.href = isEnd ? '' : `blog.html?page=${pages}`;
  // вставляем все на страницу
  wrapper.append(firstItem, paginationList, lastItem);
};

// функция вызова рендера пагинации
export const startPagination = (paginationWrapper, pages, page) => {
  // передаем в конце сколько в счетчике элементов хоти видеть
  pagination(paginationWrapper, pages, page, 3);
};

getPostData();
if (postsList) createPostList();
// if (navList) createPostNav();

// запуск пагинации с сервера
if (pageNav) {
  const paginationServer = await getPostData();
  startPagination(pageNav, paginationServer.pagination.pages, paginationServer.pagination.page);
};

