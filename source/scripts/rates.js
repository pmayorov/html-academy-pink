const ratesBtn = document.querySelectorAll('.rates__btn');
const ratesHeadCol = document.querySelectorAll('.rates__head-col');
const ratesTable = document.querySelector('.rates__table');
ratesBtn.forEach((button, index) => {
  button.addEventListener('click', () => {
    ratesTable.style.setProperty('--index-column', index + 1);
    // Удаляем *--active классы
    document.querySelector('.rates__head-col--active').classList.remove('rates__head-col--active');
    document.querySelector('.togglers__btn--active.rates__btn').classList.remove('togglers__btn--active');
    // Добавляем *--active классы
    ratesHeadCol[index].classList.add('rates__head-col--active');
    ratesBtn[index].classList.add('togglers__btn--active');
  });
});


