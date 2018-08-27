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



export default HomePage;
