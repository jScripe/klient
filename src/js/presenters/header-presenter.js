import header from '../views/tempHeader.hbs';
import searchField from '../views/tempSearchField.hbs';

import { autobind } from 'core-decorators';



class Header {
    constructor(history) {
        this.history  = history;
    }

    //////////////////////////////////////////////

    checkTokenForRefreshSite() {
        if(localStorage.getItem('token') === null) {
            this.iconSignOut.style.display = 'none';
            this.iconSignIn.style.display = 'block';
        }
        else {
            this.iconSignOut.style.display = 'block';
            this.iconSignIn.style.display = 'none';
        }
    }

    /////////////////////////////////////////////

    init() {
        this.render(header([]));

        this.getLogo();
        this.getButtonToCart();
        this.getIconSignIn();
        this.getIconSignOut();
        this.getSearchInputHeader();
        this.getHeaderSearchField();


        this.getBody();

        this.bindEvents();

        this.checkTokenForRefreshSite();
    }

    render(compiledTemplate) {
        this.elem = document.getElementById('header-root');
        this.elem.innerHTML = compiledTemplate;
    }

    renderSearchField(compiledTemplate) {
        this.headerSearchField.innerHTML = compiledTemplate;
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

    getSearchInputHeader() {
        this.searchInputHeader = document.querySelector('.header__search');
    }

    getHeaderSearchField() {
        this.headerSearchField = document.querySelector('.header__search-field');
    }

    getBody() {
        this.body = document.querySelector('body');
    }

    getItemsSearchField() {
        this.itemSearchField = document.querySelectorAll('.header__item-search-field');
    }


    bindEvents() {
        this.logo.addEventListener('click', this.handleLogoClick, false);
        this.buttonToCart.addEventListener('click', this.handleButtonsGoods, false);
        this.iconSignOut.addEventListener('click', this.handleIconSignOutClick, false);
        this.searchInputHeader.addEventListener('focus', this.handleSearchFieldFocus, false);
        this.body.addEventListener('click', this.handleSearchFieldHide, false);
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
            this.history.push('/');
        })
        .catch((error) => {
            alert(error);
        })
    }

    @autobind
    handleSearchFieldFocus() {
        fetch('http://localhost:3000/api/goods', {
            method: 'GET',
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.renderSearchField(searchField(data));
                this.headerSearchField.style.display = 'block';
                this.getItemsSearchField();
                this.itemSearchField.forEach((elem) => {
                    elem.addEventListener('click', this.handleItemSearchFieldClick, false);
                })
            })
            .catch((error) => {
                alert(error);
            })
    }

    @autobind
    handleSearchFieldHide(event) {
        if(event.target.className === 'header__search' || event.target.className === 'header__item-search-field') {
            return false;
        } else {
            this.headerSearchField.style.display = 'none';
        }
    }

    @autobind
    handleItemSearchFieldClick() {
        this.history.push(`/product?id=${event.target.dataset.id}&category=${event.target.dataset.category}`);        
    }

    unbind() {
        
    }

    clean() {
        this.unbind();      
    }
}


export default Header;