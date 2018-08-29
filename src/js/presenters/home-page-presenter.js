import $ from 'jquery';
import Presenter from './presenter';
import MainModel from '../models/main-model';
import {categories} from '../models/categories';

import tempHomePage from '../views/tempHomePage.hbs';

var data = categories;

function HomePage(history) {
    Presenter.apply(this, arguments);
    this.history = history;
    this.model = new MainModel();
}

HomePage.prototype = Object.create(Presenter.prototype);
HomePage.prototype.constructor = HomePage;

HomePage.prototype.init = function() {
    this.render(tempHomePage(data));
    this.getLinks();
    this.bindEvents();
    this.initPopap();
}

HomePage.prototype.initPopap = function() {
    (function popup() {
        $(document).ready(function() {
            $('.header__quit').click(function() {
                $('.block-login-form').addClass('block-login-form--active');
                $('.bg-block-login-form').fadeIn();        
            });

            $('.bg-block-login-form').click(function() {
                $('.block-login-form').removeClass('block-login-form--active');
                $('.block-registration').removeClass('block-registration--active');        
                $('.bg-block-login-form').fadeOut();
            });

            $('.general-close-modal').click(function() {
                $('.block-login-form').removeClass('block-login-form--active');
                $('.block-registration').removeClass('block-registration--active');                
                $('.bg-block-login-form').fadeOut();
            });

            $('.login-form__reg').click(function() {
                $('.block-login-form').removeClass('block-login-form--active');
                $('.block-registration').addClass('block-registration--active');
            });
            
            $('.registration-form__reg').click(function() {
                $('.block-registration').removeClass('block-registration--active');
                $('.block-login-form').addClass('block-login-form--active');
            });
        })
    })() 
}

HomePage.prototype.getLinks = function () {
    this.categoriesLinks = document.querySelectorAll('.item-home-page');
}

HomePage.prototype.bindEvents = function() {
    this.categoriesLinks.forEach((element) => {
        element.addEventListener('click', this.handleCategoryLinkClick.bind(this), false);
    });
}

HomePage.prototype.handleCategoryLinkClick = function (event) {
    event.preventDefault();
    this.history.push(`/categories?id=${event.currentTarget.dataset.id}`);
}

HomePage.prototype.clean = function() {
    this.element.innerHTML = '';
}


export default HomePage;
