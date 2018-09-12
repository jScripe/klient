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
        this.getIconSignIn();
        this.getIconSignOut();

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

    getIconSignIn() {
        this.iconSignIn = document.querySelector('.header__quit');
    }

    getIconSignOut() {
        this.iconSignOut = document.querySelector('.header__sign-out');
    }


    bindEvents() {
        this.logo.addEventListener('click', this.handleLogoClick, false);
        this.buttonToCart.addEventListener('click', this.handleButtonsGoods, false);
        this.iconSignOut.addEventListener('click', this.handleIconSignOutClick, false);
    }

    @autobind
    handleButtonsGoods(event) {
        event.preventDefault();
        if(localStorage.getItem('token') === null) {
            alert('Для получения доступа к добавлению товаров и к корзине необходимо авторизоваться');
            return false;
        } else {
            this.history.push('/cart');
        }
    }

    @autobind
    handleLogoClick(event) {
        this.history.push('/main');
    }

    @autobind
    handleIconSignOutClick(event) {
        let tokenForUser = localStorage.getItem('token');
        let username = JSON.parse(tokenForUser).username;
        localStorage.removeItem('token');
        let data = {
            "username": username
        }

        this.iconSignOut.style.display = 'none';
        this.iconSignIn.style.display = 'block';
        fetch('http://localhost:3000/api/logout', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) => {
            return res.text();
        })
        .then((text) => {
            alert(text);
        })
        .catch((error) => {
            alert(error);
        })
    }

    unbind() {
        
    }

    clean() {
        this.unbind();      
    }
}


export default Header;