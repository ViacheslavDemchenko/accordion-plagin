/**
 * Simple Accordion Plagin
 *
 * Copyright 2021 Viacheslav Demchenko
 * 
 * Author site: https://smart-frontend.ru/
 *
 * Released under the MIT License
 *
 * Released on: August, 2021
 */
 class AccordionPlagin {
    constructor(accordionClass, accordItems, accordItemsContent, activeContentClass, activeTitleClass, options = {}) {
        this.accordion = accordionClass;
        this.accordItems = accordItems;
        this.accordItemsContent = accordItemsContent;
        this.activeContentClass = activeContentClass;
        this.activeTitleClass = activeTitleClass;
        this.options = options;
    }

    // Функция открытия блока аккордеона
    _showText(content, item) {
        if(item) {
            // Устанавливаем высоту блока в соответстви с его реальными размерами
            content.style.height = `${content.scrollHeight + this._accordItemsHeight(this.options.itemPaddingTop, this.options.itemPaddingBottom)}px`; 
            content.classList.add(this.activeContentClass);
            item.classList.add(this.activeTitleClass);
        } else {
            // Устанавливаем высоту блока в соответстви с его реальными размерами
            content.style.height = `${content.scrollHeight + this._accordItemsHeight(this.options.itemPaddingTop, this.options.itemPaddingBottom)}px`;
            content.classList.add(this.activeContentClass);
        }
    }

    // Функция закрытия блока аккордеона
    _hideText(content, item) {
        if(item) {
            // Устанавливаем нулевую высоту блока
            content.style.height = `${0}px`;
            content.classList.remove(this.activeContentClass);
            item.classList.remove(this.activeTitleClass);
        } else {
            // Устанавливаем нулевую высоту блока
            content.style.height = `${0}px`;
            content.classList.remove(this.activeContentClass);
        }
    }

    // Функция проверки состояния блока (открыт или закрыт)
    _activeItemsHandler(content, i, el) {
        /**
         * Проверка наличия или отсутствия активного класса у блока и передача в функцию _hideText контент блока
         * и сам блок, на котором был клик
         */
        if (content[i].classList.contains(this.activeContentClass)) {
            this._hideText(content[i], el);
        } else {
            this._showText(content[i], el);
        }
    }
    /**
     * Функция получает контент блока, сам блок и параметр возможности открытия
     * любого количества блоков без закрытия ранее открытых.
     * Предназначена для работы только при наличии параметра возможности открытия
     * любого количества блоков без закрытия ранее открытых
     */
    _accordItemsManyHandler(content, item, anyActiveItems) {
        // Отслеживаем клик по блокам
        item.forEach( (el, i) => {
            el.addEventListener('click', () => {
                /**
                * При наличии параметра возможности открытия любого количества блоков без закрытия ранее открытых
                * передаем в функцию _activeItemsHandler контент блока и сам блок по которому был клик
                */
                if(anyActiveItems) {
                    this._activeItemsHandler(content, i, el);
                } else {
                    /**
                    * При запрете возможности открытия любого количества блоков без закрытия ранее открытых
                    * закрываем все открытые (активные) блоки и передаем в функцию _activeItemsHandler
                    * контент блока и сам блок по которому был клик
                    */
                    item.forEach( (el, i) => {
                        // Запускаем функцию закрытия блока
                        this._hideText(content[i], el);
                    });
                    this._activeItemsHandler(content, i, el);
                }
            });
        });
    }

    /**
     * Функция получает контент блока и сам блок и открывает или закрывает блок в зависимости от
     * наличия или отсутствия активного класса
     * Предназначена для работы только при отсутствии параметра возможности открытия
     * любого количества блоков без закрытия ранее открытых
     */
    _accordItemsSingleHandler(content, item) {
        item.addEventListener('click', () => {
            if (content.classList.contains(this.activeContentClass)) {
                this._hideText(content, item);
            } else {
                this._showText(content, item);
            }
        });
    }

    // Функция расчета высоты активного блока с учетом верхнего и нижнего падингов
    _accordItemsHeight(paddingTop, paddingBottom) {
        let paddimgSum = paddingTop + paddingBottom;
        return paddimgSum;
    }

    // Функция инициализации плагина
    accordInit() {

        // Проверка наличия на странице блока аккордеона по классу или id
        if(document.querySelector(this.accordion)) {
            let accordBlocks; // Переменная для коллекции блоков
            let accordContents; // Переменная для коллекции блоков контента

            // Проверка на наличие количества блоков больше одного
            if(document.querySelectorAll(this.accordItems).length > 1) {
                // Получаем коллекцию блоков по классу или id
                accordBlocks = document.querySelectorAll(this.accordItems);
                // Получаем коллекцию блоков контента по классу или id
                accordContents = document.querySelectorAll(this.accordItemsContent);

                /**
                * Проверка наличия параметра начального открытия любого количества блоков и их индексов
                */  
                if(this.options.initialActiveItem && this.options.initialActiveItemIndex) {
                    // Проверка является ли параметр числом (то есть установлен только один начально активный блок)
                    if(typeof this.options.initialActiveItemIndex === 'number') {
                        // Установка высоты указанного блока и присвоение ему активного класса
                        accordContents[this.options.initialActiveItemIndex].classList.add(this.activeContentClass);
                        accordContents[this.options.initialActiveItemIndex].style.height = `${accordContents[this.options.initialActiveItemIndex].scrollHeight}px`;
                        // Присвоение активного класса активному блоку
                        accordBlocks[this.options.initialActiveItemIndex].classList.add(this.activeTitleClass);
                    }

                    // Проверка является ли параметр объектом (то есть установлено несколько начально активных блоков)
                    if(Array.isArray(this.options.initialActiveItemIndex)) {
                        // Установка высоты указанных блоков и присвоение им активного класса через цикл
                        for(let i = 0; i < this.options.initialActiveItemIndex.length; i++) {
                            accordContents[this.options.initialActiveItemIndex[i]].classList.add(this.activeContentClass);
                            accordContents[this.options.initialActiveItemIndex[i]].style.height = `${accordContents[this.options.initialActiveItemIndex[i]].scrollHeight}px`;
                            // Присвоение активного класса активным блокам
                            accordBlocks[this.options.initialActiveItemIndex[i]].classList.add(this.activeTitleClass);
                        }
                    }
                } else {
                    /**
                    * Установка активным первого блока по умолчанию, если не указано иное
                    */
                    accordContents[0].classList.add(this.activeContentClass);
                    accordBlocks[0].classList.add(this.activeTitleClass);
                    accordContents[0].style.height = `${accordContents[0].scrollHeight}px`;
                }

                /**
                 * Проверка наличия параметра открытия любого количества блоков без закрытия ранее открытых
                 */
                if(this.options.anyActiveItems) {
                    /**
                    * Передача в функцию _accordItemsManyHandle коллекции блоков контента, самих блоков и параметра,
                    * отвечающего за возможность открытия любого количества блоков без закрытия предыдущих
                    */
                    this._accordItemsManyHandler(accordContents, accordBlocks, this.options.anyActiveItems);
                } else {
                    /**
                    * Передача в функцию _accordItemsManyHandle коллекции блоков контента, самих блоков если параметр,
                    * отвечающий за возможность открытия любого количества блоков без закрытия предыдущих отключен
                    */
                    this._accordItemsManyHandler(accordContents, accordBlocks);
                }

            } else {
                /*
                * В случае, если количество блоков аккордеона равно одному, то присваиваем контент блока
                * и сам блок в переменные
                */ 
                accordBlocks = document.querySelector(this.accordItems);
                accordContents = document.querySelector(this.accordItemsContent);
                
                // Передача блока и контента блока в функцию _accordItemsSingleHandler
                this._accordItemsSingleHandler(accordContents, accordBlocks);
            }
        }
    } 
}

export default AccordionPlagin;

const accordion = new AccordionPlagin('.accordion', '.accordion div', '.accordion p', 'active', 'active', {
    initialActiveItem: true,
    initialActiveItemIndex: 0,
    anyActiveItems: true,
    itemPaddingTop: 10,
    itemPaddingBottom: 20
});

accordion.accordInit();