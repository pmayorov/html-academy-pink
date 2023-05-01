const reviewsBtn = document.querySelectorAll('.reviews__btn');
const reviewsItem = document.querySelectorAll('.reviews__item');
const arrowsBtn = document.querySelectorAll('.arrows__btn');
const reviewsTotal = reviewsItem.length
let reviewsCurrent = 1;

//  Обработчик кнопок

reviewsBtn.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Удаляем *--active классы
    document.querySelector('.reviews__item--active').classList.remove('reviews__item--active');
    document.querySelector('.reviews__btn.togglers__btn--active').classList.remove('togglers__btn--active');
    // Добавляем *--active классы
    reviewsItem[index].classList.add('reviews__item--active');
    reviewsBtn[index].classList.add('togglers__btn--active');
  });
});

// Обработчик стрелок

arrowsBtn.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (index === 0) {
      // console.log('Клик влево');
      reviewsCurrent--
    } else {
      // console.log('Клик вправо');
      reviewsCurrent++
    };

    if (reviewsCurrent > reviewsTotal) {
      // console.log('Цикл – начало списка');
      reviewsCurrent = 1;
    } else if (reviewsCurrent === 0) {
      // console.log('Цикл – конец списка');
      reviewsCurrent = reviewsTotal;
    };

    document.querySelector('.reviews__item--active').classList.remove('reviews__item--active');
    reviewsItem[reviewsCurrent - 1].classList.add('reviews__item--active');
    // console.log('Активный слайд: ' + reviewsCurrent);
  }
  );
});






