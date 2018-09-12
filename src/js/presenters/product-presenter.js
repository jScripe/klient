import Presenter from './presenter';
import MainModel from '../models/main-model';
import {goods} from '../models/goods';

import tempItemPage from '../views/tempItemPage.hbs';

import { autobind } from 'core-decorators';


class ItemPage extends Presenter {
    constructor(history, cart) {
        super();
        this.history = history;
        this.cart = cart;
        this.model = new MainModel();
    }

    init() {
        this.getIdForGoods();
        this.getIdForCategory();

        fetch(`http://localhost:3000/api/categories/${this.idCategory}/goods/${this.idGoods}`, {
            method: 'GET'
        })
            .then((res) => {
                return res.json();
            })
            .then((product) => {
                this.render(tempItemPage(product[0]));
                this.initSlider();

                this.getButtonPrevToCategory();
                this.getButtonToAddCart();

                this.bindEvents();
            })
            .catch((error) => {
                alert(error);
            })
    }


    initSlider() {
        (function slider() {
            const elements = {
                gallery: document.querySelector('.slider-item-page'),
                images: document.querySelectorAll('.small-image-holder__image'),
                prevArrow: document.querySelector('.slider-item-page__controls .arrow-left'),
                nextArrow: document.querySelector('.slider-item-page__controls .arrow-right'),
                photoBig: document.querySelector('.slider-item-page__big-image')
            };
        
        
            initializingTheSlider();
        
            function initializingTheSlider() {
                initialAddClassActive();
                addClassActive();
                slideOnTheBigImage();
                clickThePrevArrow();
                clickTheNextArrow();
                installOfActiveImg();
        
        
                // если нужно автопереключение, юзай это:
        
                // movingForwardImageInterval(1000);
            };
        
        
            // установка первоначального активного элемента
        
            function initialAddClassActive() {
                let orderElem = (Math.ceil(elements.images.length / 2)) - 1;
                elements.images[orderElem].classList.add('small-image-holder__image--active');
            }
        
            // реализация при обычном клике на навигационные картинки
        
            function addClassActive() {
                for(let i = 0; i < elements.images.length; i++) {
                    elements.images[i].addEventListener('click', function() {
                        removeClassPrevElem();
                        elements.images[i].classList.add('small-image-holder__image--active');
                        installOfActiveImg();
                    });
                };
            };
        
        
        
            // клик бо большой картинке
        
            function slideOnTheBigImage() {
                elements.photoBig.addEventListener('click', function() {
                    let prevElem = removeClassPrevElem();
                    movingForwardImage(prevElem, elements.images);
                });
            };
        
        
            // реализация при клике на навигационные стрелочки
        
            function clickThePrevArrow() {
                elements.prevArrow.addEventListener('click', function() {
                    let prevElem = removeClassPrevElem();
                    movingBackImage(prevElem, elements.images);
                });
            };
        
            function movingBackImage(element, collectionElements) {
                if(element.previousElementSibling === null) {
                    element = collectionElements[collectionElements.length - 1];
                    element.classList.add('small-image-holder__image--active');
                    installOfActiveImg(); 
                } else {
                    element.previousElementSibling.classList.add('small-image-holder__image--active');
                    installOfActiveImg();
                };
            };
        
            ////////
        
            function clickTheNextArrow() {
                elements.nextArrow.addEventListener('click', function() {
                    let prevElem = removeClassPrevElem();
                    movingForwardImage(prevElem, elements.images);
                });
            };
        
            function movingForwardImage(element, collectionElements) {
                if(element.nextElementSibling === null) {
                    element = collectionElements[0];
                    element.classList.add('small-image-holder__image--active');
                    installOfActiveImg();
                } else {
                    element.nextElementSibling.classList.add('small-image-holder__image--active');
                    installOfActiveImg();
                };
            };
        
        
            ////////////////////////////////////////////////////////////////////////
        
            function removeClassPrevElem() {
                let activeVal = document.querySelector('.small-image-holder__image--active');
                activeVal.classList.remove('small-image-holder__image--active');
                return activeVal;
            };
        
        
            // установка основого большого изображения
        
            function installOfActiveImg() {
                let activeElem = document.querySelector('.small-image-holder__image--active');
                let srcImage = activeElem.getAttribute('src');
                elements.photoBig.setAttribute('src', srcImage);
            };
        
        
            // смена слайдов по временному интервалу автоматически
        
        
            // тут есть мини баг, во время промежутка может произойти всё что угодно
            function movingForwardImageInterval(tick) {
                setInterval(
                    () => {
                        let prevElem = removeClassPrevElem();
                        movingForwardImage(prevElem, elements.images);
                    }
                    ,tick)
            };    
        })();
    }


    getIdForGoods() {
        let idGoodsLine = location.search.split('&');
        this.idGoods = idGoodsLine[0].slice(4);
    }

    getIdForCategory() {
        let idCategoryLine = location.search.split('&');
        this.idCategory = idCategoryLine[1].slice(9);
    }

    getButtonPrevToCategory() {
        this.buttonPrev = document.querySelector('.slider-item-page__go-category');
    }

    getButtonToAddCart() {
        this.buttonToAddCart = document.querySelector('.description-item-page__button');
    }


    bindEvents() {
        this.buttonPrev.addEventListener('click', this.handleButtonPrevToCategory, false);
        this.buttonToAddCart.addEventListener('click', this.cart.add.bind(this.cart),  false);
    }

    @autobind
    handleButtonPrevToCategory(event) {
        event.preventDefault();
        this.history.push(`/categories?id=${event.currentTarget.dataset.category}`);
    }

    unbind() {
        this.buttonPrev.removeEventListener('click', this.handleButtonPrevToCategory, false);
    }

    clean() {
        this.unbind();
    }
}



export default ItemPage;
