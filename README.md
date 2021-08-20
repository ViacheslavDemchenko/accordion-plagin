Простой мини-плагин для аккордеона

1. Установка плагина 

1.1. Установить минифицированный файл плагина в папку js/libs.
1.2. Создать в папке js/modules файл настроек плагина

2. Настройки плагина

2.1. Для установки параметров плагина в файле настроек плагина необходимо создать переменную и 
присовить ей новый класс AccordionPlagin, например:

const accordion = new AccordionPlagin('.accordion', '.accordion__title', '.accordion__content', {});

2.2. В качестве параметров в new AccordionPlagin передаем класс самого аккордеона, класс заголовков блоков аккордеона
и класс блоков с контентом аккордеона в соответствующем порядке. Последний параметр (объект) является необязательным. 
Он необходим для указания кастомных настроек отличных от дефолтных. Если они не требуются, то запись будет выглядеть так:

const accordion = new AccordionPlagin('.accordion', '.accordion__title', '.accordion__content');

2.3. Кроме классов допускается и использование тегов с привязкой к классу аккордеона, например:

const accordion = new AccordionPlagin('.accordion', '.accordion h3', '.accordion p');

2.4. Кроме того, также необходимо передать классы активного блока, стили которых применяются при открытии/закрытии:

const accordion = new AccordionPlagin('.accordion', '.accordion h3', '.accordion p', 'active', 'active', {});

3. Дефолтные Настройки

3.1. По дефолту первый блок плагина изначально открыт (активный), возможно открытие сразу любого количества блоков.
3.2. Для изменения дефолтных настроек необходимо передать в объект следующие параметры:

initialActiveItem — наличие одного или нескольких открытых (активных) блоков аккордеона изначально
(может принимать значение true или false, по дефолту стоит true)
initialActiveItemIndex — индекс открытого (активного) блока (или нескольких блоков) аккордеона изначально
(может принимать число или массив чисел, если открытых блоков должно быть несколько)
Например: 

const accordion = new AccordionPlagin('.accordion', '.accordion__title', '.accordion__content', {
    initialActiveItem: true,
    initialActiveItemIndex: 0 (изначально активный первый блок)
});

const accordion = new AccordionPlagin('.accordion', '.accordion__title', '.accordion__content', {
    initialActiveItem: true,
    initialActiveItemIndex: [0, 5] (изначально активные первый и четвертый блоки)
});

anyActiveItems — определяет возможность открытия любого количества блоков без закрытия предыдущих
(может принимать значение true или false, по дефолту стоит true)

Если необходимо при открытии любого блока закрывать предыдущие открытые, то нужно указать false
Например:

const accordion = new AccordionPlagin('.accordion', '.accordion__title', '.accordion__content', {
    initialActiveItem: true,
    initialActiveItemIndex: [0, 5], (изначально активные первый и четвертый блоки)
    anyActiveItems: false
});

4. Инициализация плагина

4.1. Для активации плагина необходимо после его настроек прописать:

accordion.accordInit();

5. На одной странице может располагаться несколько аккордеонов. Для этого каждый из них должен иметь уникальный класс.
Например:

const accordion1 = new AccordionPlagin('.accordion-1', '.accordion-1 h3', '.accordion-1 p', {
    initialActiveItem: true,
    initialActiveItemIndex: 0,
    anyActiveItems: true
});
accordion1.accordInit();

const accordion2 = new AccordionPlagin('.accordion-2', '.accordion-2 h3', '.accordion-2 p', {
    initialActiveItem: true,
    initialActiveItemIndex: 0,
    anyActiveItems: true
});
accordion2.accordInit();

6. Разметка и стили

6.1. Разметка

.accordion
  div
    h3 Title
    p
      | Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, similique.
      | Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, similique.
      | Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, similique.
      | Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, similique.
  div
    h3 Title
    p
      | Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, similique.
      | Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, similique.
      | Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, similique.
      | Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, similique.
  div
    h3 Title
    p
      | Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, similique.
      | Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, similique.
      | Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, similique.
      | Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, similique.

6.2. Стили.
Необходимо указать нужные стили для:

.accordion - основной блок/обертка аккордеона;
.accordion div - отдельный блок аккордиона;
.accordion h3 - заголовок блока аккордеона;
.accordion p - скрытый контент блока аккордеона (обязательные свойства: height: 0; overflow: hidden; opacity: 0;);
.accordion h3::after - создание стрелки или любой другой иконки, анимированной при раскрытии/закрытии блока;

Для стилизации блоков аккордеона необходимо задать активный класс скрытому контенту блока со свойством opacity: 1;

.accordion p.active

Для анимации стрелки или любой другой иконки при раскрытии/закрытии блока необходимо задать активный класс псевдоэлементу:

.accordion div.active h3::after 

Пример стилизации:

.accordion {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  cursor: pointer;
}

.accordion div {
  width: 300px;
  border-radius: 5px;
  background: #AFEEEE;
}

.accordion h3 {
  position: relative;
  padding: 10px 15px;
  margin: 0;
}

.accordion h3::after {
  position: absolute;
  content: "";
  right: 10px;
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  width: 20px;
  height: 10px;
  background: url(./arrow.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  will-change: transform;
  transition: transform .5s linear;
}

.accordion div.active h3::after {
  transform: translateY(-50%) rotate(270deg) !important;
}

.accordion p {
  height: 0;
  overflow: hidden;
  opacity: 0;
  margin: 0;
  padding: 0 15px;
  will-change: auto;
  transition: all .5s ease-out;
}

.accordion p.active {
  opacity: 1;
  padding: 10px 15px 20px 15px;
}