import Presenter from './presenter';
import MainModel from '../models/main-model';

import tempPaymentPage from '../views/tempPaymentPage.hbs';

class PaymentPage extends Presenter {
    constructor(history) {
        super();
        this.history = history;
        this.model = new MainModel();
    }

    init() {
        this.render(tempPaymentPage([]));

        this.bindEvents();
    }

    bindEvents() {

    }
}

export default PaymentPage;
