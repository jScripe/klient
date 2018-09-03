import Presenter from './presenter';

import cartPage from '../views/tempCartPage.hbs';

import { autobind } from 'core-decorators';


class CartPage extends Presenter {
    constructor(history, cart) {
        super();
        this.history = history;
        this.cart = cart;
    }
    
    init() {
        this.render(cartPage(this.cart.products));

        this.getButtonsRemove();
        this.getTotalPriceLeft();
        this.getTotalPriceRight();
        this.getSummaryProducts();
        this.getButtonToPay();

        this.sumPriceForProducts();
        this.sumForProducts();
        
        this.bindEvents();
    }

    ///////////////////


    getButtonsRemove() {
        this.buttonsRemove = document.querySelectorAll('.product-item__button-remove');
    }

    getTotalPriceLeft() {
        this.priceLeft = document.querySelector('.product-cards-price');
    }

    getTotalPriceRight() {
        this.priceRight = document.querySelector('.basket-summary__price');    
    }

    getSummaryProducts() {
        this.sumProducts = document.querySelector('.basket-summary__num-items');
    }

    getButtonToPay() {
        this.buttonPay = document.querySelector('.basket-summary__button');
    }


    ////////////////////

    bindEvents() {
        this.buttonsRemove.forEach((element) => {
            element.addEventListener('click', this.handleButtonRemove, false);
        });
        this.buttonsRemove.forEach((element) => {
            element.addEventListener('click', this.sumPriceForProducts, false);
        });
        this.buttonsRemove.forEach((element) => {
            element.addEventListener('click', this.sumForProducts, false);
        });
    
        this.buttonPay.addEventListener('click', this.handleButtonPayClick,false);
    }

    ///////////////////////

    @autobind
    handleButtonRemove() {
        this.cart.remove(event);
        this.init();
    }

    @autobind
    handleButtonPayClick() {
        event.preventDefault();
        this.history.push('/address');
    }

    @autobind
    sumPriceForProducts() {
        this.sumPrice = 0;
        this.cart.products.forEach(item => {
            this.sumPrice += +(item.price * item.currentValue);
        })
        this.priceLeft.innerHTML = `Total: ${this.sumPrice}$`;
        this.priceRight.innerHTML = `$${this.sumPrice}`;
    }

    @autobind
    sumForProducts() {
        this.sumProducts.innerHTML = `(${this.cart.products.length} items)`;
    }

    unbind() {
        this.buttonsRemove.forEach((element) => {
            element.removeEventListener('click', this.handleButtonRemove, false);
        });
        this.buttonsRemove.forEach((element) => {
            element.removeEventListener('click', this.sumPriceForProducts, false);
        });
        this.buttonsRemove.forEach((element) => {
            element.removeEventListener('click', this.sumForProducts, false);
        });
    
        this.buttonPay.removeEventListener('click', this.handleButtonPayClick,false);
    }

    clean() {
        this.unbind();
    }
}


export default CartPage;