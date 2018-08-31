import Presenter from './presenter';
import MainModel from '../models/main-model';
import {categories} from '../models/categories';
import {goods} from '../models/goods';


var data = categories;

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
        this.render(tempNavAndItems(data));
        let products = this.getProductsListForCategory(goods);
        this.renderGoodsGrid(tempGridItems(products));
        this.renderGoodsList(tempListItems(products));

        this.getLinks();
        this.getGoodsLinks();
        this.getGoodsLinksGridImage();
        this.getButtonsGrid();
        this.getButtonsList();
        this.getButtonToCart();
        this.getButtonsGridAndList();
        this.getBlockCartProducts();

        this.bindEvents();
        
        this.hideGoodsListForFirstRender();
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

    getButtonToCart() {
        this.buttonToCart = document.querySelector('.header__icon-basket');
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
            element.addEventListener('click', this.handleCategoryLinkClick.bind(this), false);
        });
    
        this.goodsLinks.forEach((element) => {
            element.addEventListener('click', this.handleGoodsLinkClick.bind(this), false);
        });

        this.goodsLinksImage.forEach((element) => {
            element.addEventListener('click', this.handleGoodsLinksGridImage.bind(this), false);
        });
        
        this.buttonsGrid.forEach((element) => {
            element.addEventListener('click', this.cart.add.bind(this.cart), false);
        });

        this.buttonsList.forEach((element) => {
            element.addEventListener('click', this.cart.add.bind(this.cart), false);
        });
    
        this.buttonToCart.addEventListener('click', this.handleButtonsGoods.bind(this), false);

        this.buttonList.addEventListener('click', this.handleButtonListClick.bind(this), false);

        this.buttonGrid.addEventListener('click', this.handleButtonGridClick.bind(this), false);
    }

    // ALL HANDLE CLICK

    handleCategoryLinkClick(event) {
        event.preventDefault();
        this.history.push(`/categories?id=${event.currentTarget.dataset.id}`);
    }

    handleGoodsLinkClick(event) {
        event.preventDefault();
        this.history.push(`/product?id=${event.target.dataset.id}&category=${event.target.dataset.category}`);
    }

    handleGoodsLinksGridImage(event) {
        event.preventDefault();
        this.history.push(`/product?id=${event.target.dataset.id}&category=${event.target.dataset.category}`);
    }

    handleButtonsGoods(event) {
        event.preventDefault();
        this.history.push('/cart');
    }
    
    handleButtonListClick() {
        this.blockCartProduct.style.display = 'none';
        this.buttonList.style.display = 'none';

        this.wrapperForGoodsList.style.display = 'block';
        this.buttonGrid.style.display = 'block';
    }

    handleButtonGridClick() {
        this.wrapperForGoodsList.style.display = 'none';
        this.buttonGrid.style.display = 'none';

        this.blockCartProduct.style.display = 'block';
        this.buttonList.style.display = 'block';
    }

    ////////////////////////////////////////////////

    getProductsListForCategory(data) {
        let category = location.search.slice(4);
        return data = data[`category${category}`];
    }

    clean() {
        this.element.innerHTML = '';
    }
}




export default NavAndItems;