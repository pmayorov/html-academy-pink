const form = document.querySelector('#feedback-form');
const formButton = document.querySelector('#feedback-form-btn');
const modalButtonAll = document.querySelectorAll('.modal__button');
const modalContainer = document.querySelector('.modal')

function openModal(event) {
  modalContainer.classList.remove('modal--off');
  if (!form.checkValidity()) {
    modal = document.querySelector('.modal__popup--error')
  } else {
    modal = document.querySelector('.modal__popup--success')
  }
  modal.style.display = 'flex';
  event.preventDefault();
}

function closeModal(event) {
  modalContainer.classList.add('modal--off');
  modal.style.display = 'none';
}

formButton.addEventListener('click', openModal);
for (let i = 0; i < modalButtonAll.length; i++) {
  modalButtonAll[i].addEventListener('click', closeModal);
}
