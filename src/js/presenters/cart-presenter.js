import Presenter from './presenter';

import cartPage from '../views/tempCartPage.hbs';

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
            element.addEventListener('click', this.handleButtonRemove.bind(this), false);
        });
        this.buttonsRemove.forEach((element) => {
            element.addEventListener('click', this.sumPriceForProducts.bind(this), false);
        });
        this.buttonsRemove.forEach((element) => {
            element.addEventListener('click', this.sumForProducts.bind(this), false);
        });
    
        this.buttonPay.addEventListener('click', this.handleButtonPayClick.bind(this),false);
    }

    ///////////////////////

    handleButtonRemove() {
        this.cart.remove(event);
        this.init();
    }

    handleButtonPayClick() {
        event.preventDefault();
        this.history.push('/address');
    }

    sumPriceForProducts() {
        this.sumPrice = 0;
        this.cart.products.forEach(item => {
            this.sumPrice += +item.price;
        })
        this.priceLeft.innerHTML = `Total: ${this.sumPrice}$`;
        this.priceRight.innerHTML = `$${this.sumPrice}`;
    }

    sumForProducts() {
        this.sumProducts.innerHTML = `(${this.cart.products.length} items)`;
    }
}


export default CartPage;