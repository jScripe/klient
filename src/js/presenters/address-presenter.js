import Presenter from './presenter';
import MainModel from '../models/main-model';

import tempAddressPage from '../views/tempAddressPage.hbs';

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
        this.buttonForm.addEventListener('click', this.handleButtonFormClick.bind(this),false);
    }

    handleButtonFormClick(event) {
        event.preventDefault();
        this.history.push('/payment');
    }
}


export default AddressPage;