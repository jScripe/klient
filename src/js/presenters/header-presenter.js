import header from '../views/tempHeader.hbs';

import { autobind } from 'core-decorators';


class Header {
    constructor(history) {
        this.history  = history;
    }

    init() {
        this.render(header([]));
        this.getLogo();
        this.getButtonToCart();
        this.bindEvents();
    }

    render(compiledTemplate) {
        this.elem = document.getElementById('header-root');
        this.elem.innerHTML = compiledTemplate;
    }

    getLogo() {
        this.logo = document.querySelector('.header__logo-holder');
    }
    
    getButtonToCart() {
        this.buttonToCart = document.querySelector('.header__icon-basket');
    }

    bindEvents() {
        this.logo.addEventListener('click', this.handleLogoClick, false);
        this.buttonToCart.addEventListener('click', this.handleButtonsGoods, false);
    }

    @autobind
    handleButtonsGoods(event) {
        event.preventDefault();
        this.history.push('/cart');
    }

    @autobind
    handleLogoClick(event) {
        this.history.push('/');
    }

    unbind() {
        
    }

    clean() {
        this.unbind();      
    }
}


export default Header;