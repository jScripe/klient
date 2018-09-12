import Presenter from './presenter';
import MainModel from '../models/main-model';
// import {categories} from '../models/categories';
// import {goods} from '../models/goods';

import { autobind } from 'core-decorators';



// var data = categories;

import tempNavAndItems from '../views/tempNavAndItems.hbs';
import tempGridItems from '../views/tempGridItems.hbs';
import tempListItems from '../views/tempListItems.hbs';



class NavAndItems extends Presenter {
    constructor(history, cart) {
        super();
        this.history = history;
        this.cart = cart;
        this.model = new MainModel();
    }

    init() {
        fetch('http://localhost:3000/api/categories', {
            method: 'GET'
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.render(tempNavAndItems(data));
                this.getLinks();
                this.getButtonsGridAndList();
                let products = this.getProductsListForCategoryId();
                return products;
            })
            .then((categoryId) => {
                fetch(`http://localhost:3000/api/categories/${categoryId}/goods`, {
                    method: 'GET'
                })
                .then((res) => {
                    return res.json();
                })
                .then((goods) => {
                    this.renderGoodsGrid(tempGridItems(goods));
                    this.renderGoodsList(tempListItems(goods));
                    this.getGoodsLinks();
                    this.getGoodsLinksGridImage();
                    this.getButtonsGrid();
                    this.getButtonsList();
                    this.getBlockCartProducts();

                    this.bindEvents();
                    
                    this.hideGoodsListForFirstRender();
                })
                .catch((error) => {
                    alert(error);
                })
            })
            .catch((error) => {
                alert(error);
            });
    }

    // RENDER

    renderGoodsGrid(compiledTemplate) {
        this.wrapperForGoodsGrid = document.querySelector('.items-cart-holder');
        this.wrapperForGoodsGrid.innerHTML = compiledTemplate;
    }

    renderGoodsList(compiledTemplate) {
        this.wrapperForGoodsList = document.querySelector('.block-list-page');
        this.wrapperForGoodsList.innerHTML = compiledTemplate;
    }

    hideGoodsListForFirstRender() {
        this.wrapperForGoodsList.style.display = 'none';
        this.buttonGrid.style.display = 'none';
    }

    // GET ELEMENTS

    getLinks() {
        this.categoriesLinks = document.querySelectorAll('.navigation-list__link');
    }

    getGoodsLinks() {
        this.goodsLinks = document.querySelectorAll('.content-item__link');
    }

    getGoodsLinksGridImage() {
        this.goodsLinksImage = document.querySelectorAll('.item-cart-product__image');
    }

    getButtonsGrid() {
        this.buttonsGrid = document.querySelectorAll('.item-cart-product__button');
    }

    getButtonsList() {
        this.buttonsList = document.querySelectorAll('.content-item__button ');
    }

    getButtonsGridAndList() {
        this.buttonList = document.querySelector('.grid-view--list');
        this.buttonGrid = document.querySelector('.grid-view--grid');
    }

    getBlockCartProducts() {
        this.blockCartProduct = document.querySelector('.block-cart-product');
    }

    // ALL EVENTS

    bindEvents() {
        this.categoriesLinks.forEach((element) => {
            element.addEventListener('click', this.handleCategoryLinkClick, false);
        });

        // this.categoriesLinks.forEach((element) => {
        //     element.addEventListener('click', this.handleShowModifierTargetCategory, false);
        // });
    
        this.goodsLinks.forEach((element) => {
            element.addEventListener('click', this.handleGoodsLinkClick, false);
        });

        this.goodsLinksImage.forEach((element) => {
            element.addEventListener('click', this.handleGoodsLinksGridImage, false);
        });
        
        this.buttonsGrid.forEach((element) => {
            element.addEventListener('click', this.cart.add.bind(this.cart), false);
        });

        this.buttonsList.forEach((element) => {
            element.addEventListener('click', this.cart.add.bind(this.cart), false);
        });

        this.buttonList.addEventListener('click', this.handleButtonListClick, false);

        this.buttonGrid.addEventListener('click', this.handleButtonGridClick, false);
    }

    // ALL HANDLE CLICK

    @autobind
    handleCategoryLinkClick(event) {
        event.preventDefault();
        this.history.push(`/categories?id=${event.currentTarget.dataset.id}`);
    }

    // @autobind
    // handleShowModifierTargetCategory(event) {
    //     event.preventDefault();
    //     this.targetCategoryElement = event.currentTarget;
    //     console.log(event);
    // }

    @autobind
    handleGoodsLinkClick(event) {
        event.preventDefault();
        this.history.push(`/product?id=${event.target.dataset.id}&category=${event.target.dataset.category}`);
    }

    @autobind
    handleGoodsLinksGridImage(event) {
        event.preventDefault();
        this.history.push(`/product?id=${event.target.dataset.id}&category=${event.target.dataset.category}`);
    }
    
    @autobind
    handleButtonListClick() {
        this.blockCartProduct.style.display = 'none';
        this.buttonList.style.display = 'none';

        this.wrapperForGoodsList.style.display = 'block';
        this.buttonGrid.style.display = 'block';
    }

    @autobind
    handleButtonGridClick() {
        this.wrapperForGoodsList.style.display = 'none';
        this.buttonGrid.style.display = 'none';

        this.blockCartProduct.style.display = 'block';
        this.buttonList.style.display = 'block';
    }

    ////////////////////////////////////////////////

    getProductsListForCategoryId() {
        let category = location.search.slice(4);
        return category;
    }

    unbind() {
        this.categoriesLinks.forEach((element) => {
            element.removeEventListener('click', this.handleCategoryLinkClick, false);
        });
    
        this.categoriesLinks.forEach((element) => {
            element.addEventListener('click', this.handleShowModifierTargetCategory, false);
        });

        this.goodsLinks.forEach((element) => {
            element.removeEventListener('click', this.handleGoodsLinkClick, false);
        });

        this.goodsLinksImage.forEach((element) => {
            element.removeEventListener('click', this.handleGoodsLinksGridImage, false);
        });

        this.buttonList.removeEventListener('click', this.handleButtonListClick, false);

        this.buttonGrid.removeEventListener('click', this.handleButtonGridClick, false);
    }

    clean() {
        this.unbind();
    }
}




export default NavAndItems;