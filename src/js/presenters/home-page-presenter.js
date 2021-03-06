import $ from 'jquery';
import Presenter from './presenter';
import MainModel from '../models/main-model';
import {categories} from '../models/categories';

import { autobind } from 'core-decorators';

import tempHomePage from '../views/tempHomePage.hbs';

var data = categories;

class HomePage extends Presenter {
    constructor(history) {
        super();
        this.history = history;
        this.model = new MainModel();
    }

    
    
    init() {
        fetch('http://localhost:3000/api/categories', {
            method: 'GET'
        })
            .then(function(res) {
                return res.json();
            })
            .then((function(data) {
                this.render(tempHomePage(data));
                this.getLinks();
                this.bindEvents();
                this.initPopap();
            }).bind(this))
            .catch(function(error) {
                console.log(1);
                alert(error);
            })
    }

    getLinks() {
        this.categoriesLinks = document.querySelectorAll('.item-home-page');
    }

    bindEvents() {
        this.categoriesLinks.forEach((element) => {
            element.addEventListener('click', this.handleCategoryLinkClick, false);
        });
    }

    @autobind
    handleCategoryLinkClick(event) {
        event.preventDefault();
        this.history.push(`/categories?id=${event.currentTarget.dataset.id}`);
    }

    initPopap() {
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
        })(); 
    }

    unbind() {
        this.categoriesLinks.forEach((element) => {
            element.removeEventListener('click', this.handleCategoryLinkClick, false);
        });
    }

    clean() {
        this.unbind();
    }
}


export default HomePage;
