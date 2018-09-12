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
        fetch('http://localhost:3000/api/cart', {
            method: 'GET',
            headers: {
                "token": JSON.parse(localStorage.getItem('token')).token
            }
        })
            .then((res) => {
                if(res.status === 204) {
                    return res.text();
                }
                return res.json();
            })
            .then((products) => {
                this.render(cartPage(products));

                this.getButtonsRemove();
                this.getTotalPriceLeft();
                this.getTotalPriceRight();
                this.getSummaryProducts();
                this.getButtonToPay();

                this.sumPriceForProducts(products);
                this.sumForProducts(products);
                
                this.bindEvents();
            })
            .catch((error) => {
                alert(error);
            })
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
    sumPriceForProducts(products) {
        this.sumPrice = 0;
        products.forEach(item => {
            this.sumPrice += +(item.price * item.currentValue);
        })
        this.priceLeft.innerHTML = `Total: ${this.sumPrice}$`;
        this.priceRight.innerHTML = `$${this.sumPrice}`;
    }

    @autobind
    sumForProducts(products) {
        this.sumProducts.innerHTML = `(${products.length} items)`;
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