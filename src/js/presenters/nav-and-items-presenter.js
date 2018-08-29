import Presenter from './presenter';
import MainModel from '../models/main-model';
import {categories} from '../models/categories';
import {goods} from '../models/goods';


var data = categories;

import tempNavAndItems from '../views/tempNavAndItems.hbs';
import tempGridItems from '../views/tempGridItems.hbs';
import tempListItems from '../views/tempListItems.hbs';

function NavAndItems(history, cart) {
    Presenter.apply(this, arguments);
    this.history = history;
    this.cart = cart;
    this.model = new MainModel();
}

NavAndItems.prototype = Object.create(Presenter.prototype);
NavAndItems.prototype.constructor = NavAndItems;

NavAndItems.prototype.renderGoodsGrid = function(compiledTemplate) {
    this.wrapperForGoodsGrid = document.querySelector('.items-cart-holder');
    this.wrapperForGoodsGrid.innerHTML = compiledTemplate;
}

NavAndItems.prototype.renderGoodsList = function(compiledTemplate) {
    this.wrapperForGoodsList = document.querySelector('.block-list-page');
    this.wrapperForGoodsList.innerHTML = compiledTemplate;
}

NavAndItems.prototype.hideGoodsListForFirstRender = function() {
    this.buttonList = document.querySelector('.grid-view--list');
    this.buttonGrid = document.querySelector('.grid-view--grid');
    this.blockCartProduct = document.querySelector('.block-cart-product');

    this.wrapperForGoodsList.style.display = 'none';
    this.buttonGrid.style.display = 'none';
}

NavAndItems.prototype.showGoodsList = function() {
    this.buttonList.addEventListener('click', (function() {
        this.blockCartProduct.style.display = 'none';
        this.buttonList.style.display = 'none';

        this.wrapperForGoodsList.style.display = 'block';
        this.buttonGrid.style.display = 'block';
    }).bind(this));
}

NavAndItems.prototype.showGoodsGrid = function() {
    this.buttonGrid.addEventListener('click', (function() {
        this.wrapperForGoodsList.style.display = 'none';
        this.buttonGrid.style.display = 'none';

        this.blockCartProduct.style.display = 'block';
        this.buttonList.style.display = 'block';
    }).bind(this));
}

NavAndItems.prototype.getLinks = function () {
    this.categoriesLinks = document.querySelectorAll('.navigation-list__link');
}

NavAndItems.prototype.getGoodsLinks = function() {
    this.goodsLinks = document.querySelectorAll('.content-item__link');
}

NavAndItems.prototype.getButtonsGrid = function() {
    this.buttonsGrid = document.querySelectorAll('.item-cart-product__button');
}

NavAndItems.prototype.getButtonToCart = function() {
    this.buttonToCart = document.querySelector('.header__icon-basket');
}

NavAndItems.prototype.bindEvents = function() {
    this.categoriesLinks.forEach((element) => {
        element.addEventListener('click', this.handleCategoryLinkClick.bind(this), false);
    });

    this.goodsLinks.forEach((element) => {
        element.addEventListener('click', this.handleGoodsLinkClick.bind(this), false);
    });
    
    this.buttonsGrid.forEach((element) => {
        element.addEventListener('click', this.cart.add.bind(this.cart), false);
    });

    this.buttonToCart.addEventListener('click', this.handleButtonsGoods.bind(this), false);
}

NavAndItems.prototype.handleCategoryLinkClick = function(event) {
    event.preventDefault();
    this.history.push(`/categories?id=${event.currentTarget.dataset.id}`);
}

NavAndItems.prototype.handleGoodsLinkClick = function(event) {
        event.preventDefault();
        this.history.push(`/product?id=${event.target.dataset.id}#${event.target.dataset.category}`);
}

NavAndItems.prototype.handleButtonsGoods = function(event) {
    event.preventDefault();
    this.history.push('/cart');
}

NavAndItems.prototype.getProductsListForCategory = function(data) {
    let category = location.search.slice(4);
    return data = data[`category${category}`];
}




NavAndItems.prototype.init = function() {
    this.render(tempNavAndItems(data));
    let products = this.getProductsListForCategory(goods);
    this.renderGoodsGrid(tempGridItems(products));
    this.renderGoodsList(tempListItems(products));
    this.hideGoodsListForFirstRender();
    this.showGoodsList();
    this.showGoodsGrid();

    this.getLinks();
    this.getGoodsLinks();
    this.getButtonsGrid();
    this.getButtonToCart();
    this.bindEvents();

}

NavAndItems.prototype.clean = function() {
    this.element.innerHTML = '';
}


export default NavAndItems;