// Если вам нужно отслеживать изменения количества элементов в списке постоянно и автоматически обновлять стиль сетки, то можно использовать MutationObserver.
// MutationObserver – это объект, который позволяет отслеживать изменения DOM - дерева и выполнять какие - либо действия в ответ на эти изменения.


// Получаем ссылку на секцию
const achievementSection = document.querySelector('.fieldset--achievement');

// Получаем список элементов внутри секции
const achievementList = achievementSection.querySelector('.fieldset__list');

// Функция для обновления стиля сетки
function updateGridStyle() {

  const mediaQuery = window.matchMedia('(min-width: 1200px)');
  if (!mediaQuery.matches) {
    return; // Выходим из функции, если ширина экрана меньше 1200px
  }

  const achievementCount = achievementList.children.length;
  const numRows = Math.ceil(achievementCount / 3);
  achievementList.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
}

// Создаем экземпляр MutationObserver
const observer = new MutationObserver(updateGridStyle);

// Настраиваем параметры наблюдения
const observerConfig = {
  childList: true, // отслеживать добавление и удаление дочерних элементов
  // subtree: true // отслеживать изменения во всех вложенных элементах
};

// Начинаем наблюдение
observer.observe(achievementList, observerConfig);

// Добавляем обработчик изменения размера окна
window.addEventListener('resize', updateGridStyle);

// В этом коде мы сначала определяем функцию updateGridStyle(), которая будет вызываться каждый раз, когда изменится список элементов внутри секции. Эта функция вычисляет количество строк в сетке и обновляет стиль сетки, как описано в предыдущем ответе.

// Затем мы создаем экземпляр MutationObserver и передаем в него функцию updateGridStyle() в качестве обратного вызова(callback), которая будет вызываться при каждом изменении DOM - дерева.

// Мы также настраиваем параметры наблюдения для отслеживания изменений в списке элементов, используя объект observerConfig. Эти параметры указывают, что мы хотим отслеживать добавление и удаление дочерних элементов и изменения во всех вложенных элементах.

// Наконец, мы начинаем наблюдение, вызывая метод observe() у экземпляра MutationObserver и передавая ему список элементов и объект observerConfig.

// Теперь функция updateGridStyle() будет вызываться автоматически каждый раз, когда произойдут изменения в списке элементов, и стиль сетки будет автоматически обновляться.


