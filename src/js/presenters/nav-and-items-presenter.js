import Presenter from './presenter';
import MainModel from '../models/main-model';
import {categories} from '../models/categories';

var data = categories;

import tempNavAndItems from '../views/tempNavAndItems.hbs';

function NavAndItems(history) {
    Presenter.apply(this, arguments);
    this.history = history;
    this.model = new MainModel();
}

NavAndItems.prototype = Object.create(Presenter.prototype);
NavAndItems.prototype.constructor = NavAndItems;

NavAndItems.prototype.init = function() {
    this.render(tempNavAndItems(data));
}



export default NavAndItems;