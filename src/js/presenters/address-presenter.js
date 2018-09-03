import Presenter from './presenter';
import MainModel from '../models/main-model';

import tempAddressPage from '../views/tempAddressPage.hbs';

import { autobind } from 'core-decorators';


class AddressPage extends Presenter {
    constructor(history) {
        super();
        this.history = history;
        this.model = new MainModel();
    }
    
    init() {
        this.render(tempAddressPage([]));

        this.getButtonForm();
        this.bindEvents();
    }

    getButtonForm() {
        this.buttonForm = document.querySelector('.button-address-page');
    }

    bindEvents() {
        this.buttonForm.addEventListener('click', this.handleButtonFormClick,false);
    }

    @autobind
    handleButtonFormClick(event) {
        event.preventDefault();
        this.history.push('/payment');
    }

    unbind() {
        this.buttonForm.removeEventListener('click', this.handleButtonFormClick,false);
    }

    clean() {
        this.unbind();
    }
}


export default AddressPage;