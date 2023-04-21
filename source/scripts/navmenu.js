let navToggler = document.getElementById('nav-toggler')
let navList = document.querySelector('.nav__list');
let header = document.querySelector('.header');

navToggler.classList.remove('nav__toggler--nojs');
navList.classList.remove('nav__list--nojs');
header.classList.remove('header--nojs');

navToggler.onclick = function () {
  navToggler.classList.toggle('nav__toggler--active');
  navList.classList.toggle('nav__list--active');
  header.classList.toggle('header--active');
}
